# Handover Guide for Gemini — My Tools Website
## Current status and all 17 tools to build

---

## WHAT IS ALREADY DONE — DO NOT REDO ANY OF THIS

- ✅ Astro project created — `my-tools-site`
- ✅ GitHub repository live — `github.com/Anirudh96227/my-tools-site`
- ✅ Cloudflare connected and deploying automatically
- ✅ Live website URL — `my-tools-site.1996alivek.workers.dev`
- ✅ astro.config.mjs updated with vite optimizeDeps exclude for @huggingface/transformers
- ✅ GitHub logged in as Anirudh96227
- ✅ All dependencies installed

---

## HOW TO WORK WITH ME (GEMINI IN CLOUD SHELL EDITOR)

I am Gemini inside Cloud Shell Editor at shell.cloud.google.com — I can read and write files directly in the my-tools-site project. After I build each tool, the user goes to the Terminal and runs:

```
git add . && git commit -m "add tool name" && git push
```

Cloudflare then deploys automatically in 60 seconds.

---

## IMPORTANT RULES FOR EVERY TOOL YOU BUILD

1. Every tool is its own Astro page — never put tool code in a shared layout
2. AI model pipelines always run inside a Web Worker — never on the main thread
3. Always show a real download progress bar using the pipeline progress_callback
4. Always include device: 'webgpu' with a WASM fallback
5. @huggingface/transformers is already excluded from Vite pre-bundling in astro.config.mjs
6. No user accounts, no login, no data sent to any server
7. Every tool must work on mobile — test layout at 375px width
8. Add copy and download buttons on all text outputs
9. Keep all HTML, CSS and JavaScript in one .astro file unless a Web Worker file is needed

---

## THE LIVE WEBSITE STRUCTURE

```
my-tools-site.1996alivek.workers.dev/
├── /                          ← homepage (build last)
├── /tools/word-count          ← Tool 1
├── /tools/password-gen        ← Tool 2
├── /tools/concrete-calc       ← Tool 3
├── /tools/bill-split          ← Tool 4
├── /tools/electrical-calc     ← Tool 5
├── /tools/file-renamer        ← Tool 6
├── /tools/cooking-converter   ← Tool 7
├── /tools/hvac-calc           ← Tool 8
├── /tools/scan-to-text        ← Tool 9
├── /tools/transcribe          ← Tool 10
├── /tools/voice-cleanup       ← Tool 11
├── /tools/live-captions       ← Tool 12
├── /tools/identify            ← Tool 13
├── /tools/anonymize           ← Tool 14
├── /tools/photo-translate     ← Tool 15
├── /tools/remove-bg           ← Tool 16
└── /tools/summarize           ← Tool 17
```

---

## BUILD ORDER — START FROM TOOL 1

---

### TOOL 1 — Word Counter
**File:** `src/pages/tools/word-count.astro`
**No model needed — instant load**

> Build an Astro page at src/pages/tools/word-count.astro. As the user types in a big text box, show live counts below it for: words, characters with spaces, characters without spaces, sentences, paragraphs, and reading time in minutes at 200 words per minute. Add a Clear button and a Copy Text button. Make it mobile friendly. Keep all HTML, CSS and JavaScript in one file. No backend.

---

### TOOL 2 — Password Generator
**File:** `src/pages/tools/password-gen.astro`
**No model needed — instant load**

> Build an Astro page at src/pages/tools/password-gen.astro. Two modes with a tab switcher. Mode 1: random password — slider for length 8 to 64, checkboxes for uppercase letters, lowercase letters, numbers, and symbols, show a password strength meter as a coloured bar. Mode 2: passphrase — bundle the EFF short wordlist as a JavaScript array in the file, generate 3 to 6 random words separated by a hyphen. Use window.crypto.getRandomValues for all randomness, never Math.random. Big Copy button. Regenerate button. Mobile friendly. No backend.

---

### TOOL 3 — Concrete Calculator
**File:** `src/pages/tools/concrete-calc.astro`
**No model needed — instant load**

> Build an Astro page at src/pages/tools/concrete-calc.astro with three separate calculators on one page. Calculator 1: Slab — user enters length, width, depth in metres, get cubic metres and number of 25kg bags needed, with a toggle for 10 percent waste buffer. Calculator 2: Post hole — user enters hole diameter and depth in metres and post width, get volume of concrete needed. Calculator 3: Rebar — user enters slab length, slab width, and rebar spacing in cm, get total number of rebar bars needed in both directions. Show the formula used under each result. Add a Copy Results button for each. Mobile friendly. No backend.

---

### TOOL 4 — Bill Splitter
**File:** `src/pages/tools/bill-split.astro`
**No model needed — instant load**

> Build an Astro page at src/pages/tools/bill-split.astro with two modes. Mode 1 Equal Split: user enters total bill, tip percentage, number of people — show tip amount, total with tip, and amount per person. Mode 2 By Item: user can add people by name, then add items with a price and assign each item to one person or split equally among all — show each person's total including their proportional share of the tip. Add a Reset button. Mobile friendly. No backend.

---

### TOOL 5 — Electrical Calculator
**File:** `src/pages/tools/electrical-calc.astro`
**No model needed — instant load**

> Build an Astro page at src/pages/tools/electrical-calc.astro with three calculators. Calculator 1: Load calculator — user adds appliances from a dropdown of 25 common household items each with typical watts built in (fridge 150W, microwave 1000W, TV 100W, AC 1500W, washing machine 500W, laptop 65W, phone charger 20W, LED bulb 10W, iron 2200W, water heater 3000W, toaster 900W, kettle 2000W, fan 75W, hair dryer 1800W, dishwasher 1800W, vacuum 900W, router 20W, desktop PC 300W, gaming console 200W, electric oven 2000W, coffee maker 1000W, and 4 more common ones) — show total watts and total amps at 240V. Calculator 2: Generator size — user enters total watts, get recommended generator size in kW as the next standard size up. Calculator 3: Breaker size — user enters load watts, get minimum breaker amps using the NEC 80 percent rule. Mobile friendly. No backend.

---

### TOOL 6 — File Renamer
**File:** `src/pages/tools/file-renamer.astro`
**No model needed — instant load**

> Build an Astro page at src/pages/tools/file-renamer.astro. User pastes a list of filenames one per line into a textarea. Show a panel of toggle options: add a custom prefix, add a custom suffix, replace spaces with hyphens, replace spaces with underscores, make all lowercase, make all uppercase, remove special characters except dots and hyphens, add a sequential number at the start like 001 002 003. Show a live preview of renamed files on the right as toggles change. Copy All button for the output list. Mobile friendly. No backend.

---

### TOOL 7 — Cooking Converter
**File:** `src/pages/tools/cooking-converter.astro`
**No model needed — instant load**

> Build an Astro page at src/pages/tools/cooking-converter.astro. Two sections. Section 1: Ingredient converter — user picks an ingredient from a dropdown of 35 common ones including plain flour, sugar, butter, honey, olive oil, milk, water, rice, oats, cocoa powder, baking powder, salt, breadcrumbs, coconut, peanut butter, cream cheese, yogurt, cornflour, almond flour, raisins, chocolate chips, grated cheese, cream, condensed milk, golden syrup and others — each with accurate cup to gram density built in as a lookup table. User enters an amount and picks input unit (cups, tablespoons, teaspoons, ml, grams) and output unit — show converted amount. Section 2: Recipe scaler — user pastes ingredients list one per line like 2 cups flour, enters original servings and target servings, get scaled amounts. Mobile friendly. No backend.

---

### TOOL 8 — HVAC Calculator
**File:** `src/pages/tools/hvac-calc.astro`
**No model needed — instant load**

> Build an Astro page at src/pages/tools/hvac-calc.astro with two calculators. Calculator 1: Room ventilation — user enters room length, width, ceiling height in metres, picks room type from dropdown (bedroom 1 ACH, living room 2, kitchen 7.5, bathroom 8, office 3, gym 8, basement 1) — show required CFM and air changes per hour with formula shown. Calculator 2: Duct sizing — user enters required CFM and picks velocity (low noise 500 FPM, standard 750 FPM, high flow 1000 FPM) — show recommended round duct diameter in inches and rectangular duct size options. Mobile friendly. No backend.

---

### TOOL 9 — Document Scanner
**File:** `src/pages/tools/scan-to-text.astro`
**Uses Tesseract.js — install with: npm install tesseract.js**

> Build an Astro page at src/pages/tools/scan-to-text.astro. Install tesseract.js. User uploads or drags and drops an image of a document. Before running OCR apply a canvas preprocessing step: convert to grayscale, increase contrast, apply threshold to sharpen text — this improves accuracy on photographed documents. Run Tesseract.js recognize function with a language selector dropdown offering English, Spanish, French, German, Hindi. Show a progress bar during recognition. Output the text in an editable textarea so users can fix mistakes. Add Copy and Download as TXT buttons. Mobile friendly. No backend.

---

### TOOL 10 — Voice Transcriber
**File:** `src/pages/tools/transcribe.astro` + `public/workers/transcribe-worker.js`
**Uses @huggingface/transformers — already in package, just import it**

> Build an Astro page at src/pages/tools/transcribe.astro. Before loading any model show two big buttons: Quick — English only 40MB using Xenova/whisper-tiny.en, and Accurate — Better for accents 145MB using Xenova/whisper-base.en. Load the chosen model inside a Web Worker at public/workers/transcribe-worker.js — never on the main thread. Use postMessage to communicate between page and worker. Show a real download progress bar using the pipeline progress_callback showing percentage. Use device webgpu with WASM fallback. After model loads show a Record button using MediaRecorder API and a file upload input for audio files. Show transcript in a scrollable textarea with Copy and Download as TXT buttons. Mobile friendly. No backend. The astro.config.mjs already has @huggingface/transformers in vite optimizeDeps exclude so do not change that file.

---

### TOOL 11 — Voice Memo Cleaner
**File:** `src/pages/tools/voice-cleanup.astro` + `public/workers/cleanup-worker.js`
**Uses same Whisper model as Tool 10 — will be cached already**

> Build an Astro page at src/pages/tools/voice-cleanup.astro. Load Xenova/whisper-tiny.en inside a Web Worker at public/workers/cleanup-worker.js with device webgpu and WASM fallback. Show progress bar during model download. User records audio with a Record button using MediaRecorder or uploads an audio file. Transcribe with Whisper. Then run a JavaScript cleanup pass: remove filler words (um, uh, er, like, you know, so, basically, literally, right, okay at sentence starts), remove consecutive duplicate words, remove false starts. Show raw transcript and cleaned transcript side by side in two textareas. Copy and Download TXT buttons for both. Mobile friendly. No backend.

---

### TOOL 12 — Live Captions
**File:** `src/pages/tools/live-captions.astro` + `public/workers/captions-worker.js`
**Uses same Whisper model — will be cached already**

> Build an Astro page at src/pages/tools/live-captions.astro. Load Xenova/whisper-tiny.en in a Web Worker at public/workers/captions-worker.js with device webgpu and WASM fallback. Show download progress on first load. Two modes with tab switcher. Mode 1 Live Mic: Start button uses MediaRecorder to capture microphone audio in 5 second chunks, send each chunk to worker for transcription, display captions as rolling text — new text at bottom, old scrolls up, show last 30 seconds, show blinking red dot while recording. Mode 2 Video File: user uploads local video file, extract audio using Web Audio API, process through same pipeline, show full transcript when done. Copy All Captions button for both modes. Mobile friendly. No backend.

---

### TOOL 13 — Plant and Object Identifier
**File:** `src/pages/tools/identify.astro` + `public/workers/identify-worker.js`
**Uses @huggingface/transformers**

> Build an Astro page at src/pages/tools/identify.astro. Load the smallest available image classification model compatible with Transformers.js v3 — try onnx-community/mobilenetv4_conv_small_050.lamb_in12k_ft_in1k — in a Web Worker at public/workers/identify-worker.js with device webgpu and WASM fallback. Show progress bar on first model load. User uploads a photo or takes one with camera — add accept='image/*' capture='environment' to file input for mobile camera. Run image through classification pipeline. Show top 3 predictions with confidence percentage bars. Under each result add a Search Wikipedia button that opens Wikipedia search in a new tab. Add note: Best for common plants, animals and objects — not for medical or allergy decisions. Mobile friendly. No backend.

---

### TOOL 14 — Document Anonymizer
**File:** `src/pages/tools/anonymize.astro` + `public/workers/ner-worker.js`
**Uses @huggingface/transformers**

> Build an Astro page at src/pages/tools/anonymize.astro. User pastes text into a textarea or uploads a TXT file. Load Xenova/bert-base-NER in a Web Worker at public/workers/ner-worker.js with device webgpu and WASM fallback. Show download progress bar. After running NER to find names, locations, organisations — also run JavaScript regex to find email addresses and phone numbers. Replace all found entities with labels: [NAME], [LOCATION], [ORGANISATION], [EMAIL], [PHONE]. Show original text and anonymized text side by side. Below both show a list of everything found and replaced — add an Undo button next to each item for false positives. Copy and Download TXT buttons for anonymized version. Mobile friendly. No backend.

---

### TOOL 15 — Photo Translator
**File:** `src/pages/tools/photo-translate.astro` + `public/workers/translate-worker.js`
**Uses @huggingface/transformers + tesseract.js**

> Build an Astro page at src/pages/tools/photo-translate.astro. Four clear steps on the page. Step 1: user uploads a photo. Step 2: run Tesseract.js OCR in its built-in worker to extract text — show progress bar. Step 3: user picks target language from dropdown of 12 languages — for Spanish, French, German, Italian, Portuguese, Dutch, Russian use specific Xenova/opus-mt models, for others use Xenova/nllb-200-distilled-600M as fallback — run translation in Web Worker at public/workers/translate-worker.js with device webgpu and WASM fallback, show progress bar for model download. Step 4: show original extracted text and translated text side by side, both copyable. Mobile friendly. No backend.

---

### TOOL 16 — Background Remover
**File:** `src/pages/tools/remove-bg.astro` + `public/workers/rmbg-worker.js`
**Uses @huggingface/transformers**

> Build an Astro page at src/pages/tools/remove-bg.astro. User uploads or drags and drops a photo. Load briaai/RMBG-1.4 model inside a Web Worker at public/workers/rmbg-worker.js with device webgpu and WASM fallback. Show a real download progress bar on first model load. Run image through the image segmentation pipeline. Show result as transparent PNG on a canvas element. Add Download PNG button. Add a colour picker so user can pick a solid background colour to replace transparency — update canvas preview live. Mobile friendly. No backend.

---

### TOOL 17 — Text Summarizer
**File:** `src/pages/tools/summarize.astro` + `public/workers/summarize-worker.js`
**Uses @huggingface/transformers — largest download, do this last**

> Build an Astro page at src/pages/tools/summarize.astro. Before loading anything show two option cards: Option 1 Quick Summary — 300MB one-time download using Xenova/distilbart-cnn-12-6, Option 2 Detailed Summary with action items — 500MB one-time download using onnx-community/Qwen3-0.6B-ONNX. Show a clear warning these are large one-time downloads that cache forever after. Load chosen model in Web Worker at public/workers/summarize-worker.js with device webgpu and WASM fallback. Show real download progress bar with MB and percentage. User pastes text or uploads TXT file. If text is longer than 1000 words split into chunks, summarize each, then combine. Show output as 5 bullet point key takeaways. For Option 2 also show an Action Items section separately. Copy and Download TXT buttons. Mobile friendly. No backend.

---

### HOMEPAGE — Build this after at least 4 tools are done
**File:** `src/pages/index.astro`

> Replace the existing src/pages/index.astro with a new homepage. Show a clean header with site name and description: Free tools that work on your device — nothing uploaded, no account needed. Below show two sections. Section 1 called Instant Tools — no download, works immediately with cards for: Word Counter /tools/word-count, Password Generator /tools/password-gen, Concrete Calculator /tools/concrete-calc, Bill Splitter /tools/bill-split, Electrical Calculator /tools/electrical-calc, File Renamer /tools/file-renamer, Cooking Converter /tools/cooking-converter, HVAC Calculator /tools/hvac-calc. Section 2 called AI Tools — first visit downloads a small program then works offline forever with cards for: Document Scanner /tools/scan-to-text, Voice Transcriber /tools/transcribe, Voice Memo Cleaner /tools/voice-cleanup, Live Captions /tools/live-captions, Plant Identifier /tools/identify, Document Anonymizer /tools/anonymize, Photo Translator /tools/photo-translate, Background Remover /tools/remove-bg, Text Summarizer /tools/summarize. Each card shows tool name, one sentence description, and links to the tool page. Clean grid layout. Mobile friendly.

---

## AFTER EVERY SINGLE TOOL — RUN THIS IN TERMINAL

```
git add . && git commit -m "add tool name here" && git push
```

Cloudflare deploys automatically in 60 seconds.

---

## IF THERE IS AN ERROR

Just say: "I got this error: [paste error]. Fix it."

---

## LIVE SITE

`my-tools-site.1996alivek.workers.dev`
