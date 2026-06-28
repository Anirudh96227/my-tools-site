import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.0';

env.allowLocalModels = false;

let translator = null;
let currentModel = null;

const OPUS_MODELS = {
    'es': 'Xenova/opus-mt-en-es',
    'fr': 'Xenova/opus-mt-en-fr',
    'de': 'Xenova/opus-mt-en-de',
    'it': 'Xenova/opus-mt-en-it',
    'pt': 'Xenova/opus-mt-en-pt',
    'nl': 'Xenova/opus-mt-en-nl',
    'ru': 'Xenova/opus-mt-en-ru',
    'zh': 'Xenova/opus-mt-en-zh',
    'ja': 'Xenova/opus-mt-en-jap',
    'ko': 'Xenova/opus-mt-en-ko'
};

self.onmessage = async (e) => {
    const { type, text, targetLang } = e.data;

    if (type === 'translate') {
        const modelName = OPUS_MODELS[targetLang] || 'Xenova/nllb-200-distilled-600M';
        
        try {
            // Load new model if it's different from the current one
            if (currentModel !== modelName) {
                self.postMessage({ type: 'status', message: `Loading translation model (${modelName})...` });
                try {
                    translator = await pipeline('translation', modelName, {
                        device: 'webgpu',
                        progress_callback: (data) => {
                            if (data.status === 'progress') {
                                self.postMessage({ type: 'progress', ...data });
                            }
                        }
                    });
                    currentModel = modelName;
                } catch (err) {
                    translator = await pipeline('translation', modelName, {
                        device: 'wasm',
                        progress_callback: (data) => {
                            if (data.status === 'progress') {
                                self.postMessage({ type: 'progress', ...data });
                            }
                        }
                    });
                    currentModel = modelName;
                }
            }

            self.postMessage({ type: 'status', message: 'Translating...' });
            
            const output = await translator(text, {
                tgt_lang: modelName.includes('nllb') ? targetLangMapNLLB[targetLang] : undefined,
                src_lang: modelName.includes('nllb') ? 'eng_Latn' : undefined,
            });

            self.postMessage({ 
                type: 'result', 
                translatedText: output[0].translation_text 
            });
        } catch (err) {
            self.postMessage({ type: 'error', message: err.message });
        }
    }
};

// Mapping for NLLB fallback
const targetLangMapNLLB = {
    'ar': 'arb_Arab',
    'hi': 'hin_Deva'
};