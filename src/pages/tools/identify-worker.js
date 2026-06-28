import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.0';

// Base configurations
env.allowLocalModels = false;

let classifier = null;

self.onmessage = async (e) => {
    const { type, model, image } = e.data;

    if (type === 'load') {
        try {
            classifier = await pipeline('image-classification', model, {
                device: 'webgpu',
                progress_callback: (data) => {
                    if (data.status === 'progress') {
                        self.postMessage({ type: 'progress', ...data });
                    }
                }
            });
            self.postMessage({ type: 'loaded' });
        } catch (err) {
            // Fallback to WASM if WebGPU fails
            classifier = await pipeline('image-classification', model, {
                device: 'wasm',
                progress_callback: (data) => self.postMessage({ type: 'progress', ...data })
            });
            self.postMessage({ type: 'loaded' });
        }
    } else if (type === 'classify') {
        if (!classifier) return;

        try {
            const output = await classifier(image, { topk: 3 });
            self.postMessage({ type: 'result', results: output });
        } catch (err) {
            self.postMessage({ type: 'error', message: err.message });
        }
    }
};