import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';

// Base configurations
env.allowLocalModels = false;

let nerPipeline = null;

self.onmessage = async (e) => {
    const { type, text } = e.data;

    if (type === 'load') {
        try {
            nerPipeline = await pipeline('token-classification', 'Xenova/bert-base-NER', {
                device: 'webgpu',
                progress_callback: (data) => {
                    if (data.status === 'progress') {
                        self.postMessage({ type: 'progress', ...data });
                    }
                }
            });
            self.postMessage({ type: 'loaded' });
        } catch (err) {
            // Fallback to WASM
            nerPipeline = await pipeline('token-classification', 'Xenova/bert-base-NER', {
                device: 'wasm',
                progress_callback: (data) => {
                    if (data.status === 'progress') {
                        self.postMessage({ type: 'progress', ...data });
                    }
                }
            });
            self.postMessage({ type: 'loaded' });
        }
    } else if (type === 'analyze') {
        if (!nerPipeline) return;

        try {
            // Run NER
            const entities = await nerPipeline(text);
            self.postMessage({ 
                type: 'result', 
                entities 
            });
        } catch (err) {
            self.postMessage({ type: 'error', message: err.message });
        }
    }
};