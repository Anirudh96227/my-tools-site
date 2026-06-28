import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.0';

env.allowLocalModels = false;

let segmenter = null;

self.onmessage = async (e) => {
    const { type, image } = e.data;

    if (type === 'load') {
        try {
            segmenter = await pipeline('image-segmentation', 'briaai/RMBG-1.4', {
                device: 'webgpu',
                progress_callback: (data) => {
                    if (data.status === 'progress') {
                        self.postMessage({ type: 'progress', ...data });
                    }
                }
            });
            self.postMessage({ type: 'loaded' });
        } catch (err) {
            segmenter = await pipeline('image-segmentation', 'briaai/RMBG-1.4', {
                device: 'wasm',
                progress_callback: (data) => self.postMessage({ type: 'progress', ...data })
            });
            self.postMessage({ type: 'loaded' });
        }
    } else if (type === 'remove') {
        if (!segmenter) return;

        try {
            const output = await segmenter(image);
            // The pipeline returns a list of masks. For RMBG, it's usually just one.
            // We send the mask data back to the main thread for canvas processing.
            self.postMessage({ type: 'result', mask: output[0].mask });
        } catch (err) {
            self.postMessage({ type: 'error', message: err.message });
        }
    }
};