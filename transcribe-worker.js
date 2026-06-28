import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.0';

// Disable local models since we are fetching from the Hub
env.allowLocalModels = false;

let transcriber = null;

self.onmessage = async (e) => {
    const { type, model, audio } = e.data;

    if (type === 'load') {
        try {
            self.postMessage({ type: 'status', message: `Initializing ${model} with WebGPU...` });
            
            transcriber = await pipeline('automatic-speech-recognition', model, {
                device: 'webgpu',
                progress_callback: (p) => {
                    self.postMessage({ type: 'progress', ...p });
                }
            });
            
            self.postMessage({ type: 'loaded' });
        } catch (err) {
            console.warn("WebGPU failed or not available, falling back to WASM", err);
            try {
                self.postMessage({ type: 'status', message: `Initializing ${model} with WASM...` });
                transcriber = await pipeline('automatic-speech-recognition', model, {
                    device: 'wasm',
                    progress_callback: (p) => {
                        self.postMessage({ type: 'progress', ...p });
                    }
                });
                self.postMessage({ type: 'loaded' });
            } catch (err2) {
                self.postMessage({ type: 'error', message: err2.message });
            }
        }
    } else if (type === 'transcribe') {
        if (!transcriber) return;
        
        try {
            self.postMessage({ type: 'status', message: 'Transcribing audio...' });
            const output = await transcriber(audio, {
                chunk_length_s: 30,
                stride_length_s: 5,
            });
            self.postMessage({ type: 'result', text: output.text });
        } catch (err) {
            self.postMessage({ type: 'error', message: err.message });
        }
        }
};
