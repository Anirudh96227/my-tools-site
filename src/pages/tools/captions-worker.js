import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';

// Base configurations
env.allowLocalModels = false;

let transcriber = null;

self.onmessage = async (e) => {
    const { type, model, audio } = e.data;

    if (type === 'load') {
        try {
            self.postMessage({ type: 'status', message: 'Loading Whisper model...' });
            
            transcriber = await pipeline('automatic-speech-recognition', model || 'Xenova/whisper-tiny.en', {
                progress_callback: (data) => {
                    if (data.status === 'progress') {
                        self.postMessage({ type: 'progress', ...data });
                    }
                }
            });
            
            self.postMessage({ type: 'loaded' });
        } catch (err) {
            self.postMessage({ type: 'error', message: 'Failed to load model: ' + err.message });
        }
    } else if (type === 'transcribe') {
        if (!transcriber) {
            self.postMessage({ type: 'error', message: 'Model not loaded' });
            return;
        }

        try {
            const output = await transcriber(audio, {
                chunk_length_s: 30,
                stride_length_s: 5,
                language: e.data.language === 'auto' ? null : e.data.language,
                task: e.data.task || 'transcribe',
                return_timestamps: false,
            });

            self.postMessage({ 
                type: 'result', 
                text: output.text 
            });
        } catch (err) {
            self.postMessage({ type: 'error', message: 'Transcription failed: ' + err.message });
        }
    }
};