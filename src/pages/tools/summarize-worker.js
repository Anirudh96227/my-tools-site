import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.0';

env.allowLocalModels = false;

let summarizer = null;
let currentModel = null;

self.onmessage = async (e) => {
    const { type, model, text, task } = e.data;

    if (type === 'load') {
        try {
            self.postMessage({ type: 'status', message: `Loading summarization model (${model})...` });
            summarizer = await pipeline('summarization', model, {
                device: 'webgpu',
                progress_callback: (data) => {
                    if (data.status === 'progress') {
                        self.postMessage({ type: 'progress', ...data });
                    }
                }
            });
            currentModel = model;
            self.postMessage({ type: 'loaded' });
        } catch (err) {
            // Fallback to WASM
            try {
                self.postMessage({ type: 'status', message: `WebGPU failed, falling back to WASM for ${model}...` });
                summarizer = await pipeline('summarization', model, {
                    device: 'wasm',
                    progress_callback: (data) => {
                        if (data.status === 'progress') {
                            self.postMessage({ type: 'progress', ...data });
                        }
                    }
                });
                currentModel = model;
                self.postMessage({ type: 'loaded' });
            } catch (wasmErr) {
                self.postMessage({ type: 'error', message: `Failed to load model: ${wasmErr.message}` });
            }
        }
    } else if (type === 'summarize') {
        if (!summarizer || currentModel !== model) {
            self.postMessage({ type: 'error', message: 'Model not loaded or wrong model selected. Please load the model first.' });
            return;
        }

        try {
            self.postMessage({ type: 'status', message: 'Summarizing text...' });

            const MAX_CHARS_PER_CHUNK = 2000; // Roughly 500 tokens (approx. 4 chars/token)
            const MIN_CHARS_FOR_SUMMARY = 100; // Don't summarize tiny chunks

            let fullSummary = '';
            let actionItems = '';

            const chunks = splitTextIntoChunks(text, MAX_CHARS_PER_CHUNK);

            for (let i = 0; i < chunks.length; i++) {
                const chunk = chunks[i];
                if (chunk.length < MIN_CHARS_FOR_SUMMARY && chunks.length > 1) {
                    continue; // Skip very small chunks unless it's the only one
                }

                self.postMessage({ type: 'status', message: `Summarizing chunk ${i + 1}/${chunks.length}...` });
                self.postMessage({ type: 'progress', progress: (i / chunks.length) * 100 });

                const output = await summarizer(chunk, {
                    min_length: 50,
                    max_length: 150,
                });

                let chunkSummary = output[0].summary_text;
                
                // For Qwen3, try to extract action items if the task is 'detailed'
                if (model.includes('Qwen3') && task === 'detailed') {
                    const actionItemRegex = /(?:action items|next steps|to-do|tasks):?\s*(-?\s*.*(?:[\n]|$))+/gmi;
                    const matches = chunkSummary.match(actionItemRegex);
                    if (matches) {
                        actionItems += matches.join('\n') + '\n';
                        chunkSummary = chunkSummary.replace(actionItemRegex, '').trim();
                    }
                }
                
                fullSummary += chunkSummary + '\n\n';
            }

            self.postMessage({ type: 'result', summary: fullSummary.trim(), actionItems: actionItems.trim() });

        } catch (err) {
            self.postMessage({ type: 'error', message: `Summarization failed: ${err.message}` });
        }
    }
};

function splitTextIntoChunks(text, maxChars) {
    const chunks = [];
    let currentText = text;

    while (currentText.length > 0) {
        if (currentText.length <= maxChars) {
            chunks.push(currentText);
            currentText = '';
        } else {
            let chunk = currentText.substring(0, maxChars);
            let lastPeriod = chunk.lastIndexOf('.');
            let lastNewline = chunk.lastIndexOf('\n');

            let splitPoint = Math.max(lastPeriod, lastNewline);

            if (splitPoint > maxChars * 0.8) { // Prefer splitting at natural breaks if within the last 20% of the chunk
                chunk = currentText.substring(0, splitPoint + 1);
                currentText = currentText.substring(splitPoint + 1).trim();
            } else { // Otherwise, just split at maxChars
                currentText = currentText.substring(maxChars).trim();
            }
            chunks.push(chunk.trim());
        }
    }
    return chunks.filter(c => c.length > 0);
}