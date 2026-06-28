# My Tools Website — Complete Handover Guide
## Pick up from exactly where I left off

---

## WHERE YOU ARE RIGHT NOW

- ✅ Google Cloud Shell — open and working
- ✅ Astro project created — in `my-tools-site` folder
- ✅ GitHub — logged in as Anirudh96227
- ⏳ Need to finish pushing to GitHub
- ⏳ Need to connect Cloudflare Pages
- ⏳ Need to build all 17 tools

---

## STEP 1 — FINISH GITHUB SETUP (do this first)

Open Google Cloud Shell at shell.cloud.google.com

Paste these one at a time, pressing Enter after each:

```
git config --global user.email "anirudh96227@gmail.com"
```
(change to your real GitHub email if different)

```
git config --global user.name "Anirudh96227"
```

```
cd ~/my-tools-site
```

```
git commit -m "first commit"
```

```
gh repo create my-tools-site --public --source=. --push
```

When you see "✓ Created repository" and "✓ Pushed commits" — GitHub is done.

---

## STEP 2 — CONNECT CLOUDFLARE PAGES (do this once, in browser)

1. Go to cloudflare.com — make a free account
2. Click **Workers & Pages** in the left menu
3. Click **Create application**
4. Click **Pages** tab
5. Click **Connect to Git**
6. Connect your GitHub account → pick **my-tools-site**
7. Fill in these settings:
   - Build command: `npm run build`
   - Output directory: `dist`
8. Click **Save and Deploy**
9. Wait 2 minutes

You now have a real live website at:
**`my-tools-site.pages.dev`**

Every time you add a tool and push to GitHub, Cloudflare updates your live site automatically in 60 seconds. You never touch Cloudflare again.

---

## STEP 3 — HOW TO USE GEMINI TO BUILD TOOLS

Every time you want to build a tool:

**1. Open Cloud Shell**
Go to shell.cloud.google.com

**2. Go to your project**
```
cd ~/my-tools-site
```

**3. Open the Editor with Gemini**
Click **Open Editor** button at the top right.
The Gemini chat panel is on the right side.
Type your prompt in the box that says "Ask Gemini or type '@'"

**4. After Gemini builds the tool, go back to Terminal**
Click **Open Terminal**

**5. Push to GitHub (makes it live)**
```
git add .
git commit -m "add new tool"
git push
```

Wait 60 seconds. Your tool is live.

**That's the loop. Same every time.**

---

## STEP 4 — FIX YOUR ASTRO CONFIG FIRST

Before building any tool, do this one time.
In Gemini chat, paste this:

> "Open the file astro.config.mjs and add this vite config inside the defineConfig: vite: { optimizeDeps: { exclude: ['@huggingface/transformers'] } } — make sure not to break any existing config that's already there. Show me the final file."

After Gemini does it, push:
```
git add .
git commit -m "fix astro config"
git push
```

---

## ALL 17 TOOLS — COPY PASTE PROMPTS FOR GEMINI

Go to your Editor, open Gemini panel on the right, paste the prompt.

---

### TOOL 1 — Word Counter
**Paste this into Gemini:**
> "Build an Astro page at src/pages/tools/word-count.astro. As the user types in a big text box, show live counts below it for: words, characters with spaces, characters without spaces, sentences, paragraphs, and reading time in minutes at 200 words per minute. Add a Clear button and a Copy Text button. Make it mobile friendly. Keep all HTML, CSS and JavaScript in one file. No backend."

---

### TOOL 2 — Password Generator
**Paste this into Gemini:**
> "Build an Astro page at src/pages/tools/password-gen.astro. Two modes with a tab switcher. Mode 1: random password — slider for length 8 to 64, checkboxes for uppercase letters, lowercase letters, numbers, and symbols, show a password strength meter as a coloured bar. Mode 2: passphrase — bundle the EFF short wordlist as a JavaScript array in the file, generate 3 to 6 random words separated by a dash or hyphen. Use window.crypto.getRandomValues for all randomness, never Math.random. Big Copy button. Regenerate button. Mobile friendly. No backend."

---

### TOOL 3 — Concrete Calculator
**Paste this into Gemini:**
> "Build an Astro page at src/pages/tools/concrete-calc.astro with three separate calculators on one page. Calculator 1: Slab — user enters length, width, depth in metres, get cubic metres and number of 25kg bags needed, with a toggle for 10 percent waste buffer. Calculator 2: Post hole — user enters hole diameter and depth in metres and post width, get volume of concrete needed. Calculator 3: Rebar — user enters slab length, slab width, and rebar spacing in cm, get total number of rebar bars needed in both directions. Show the formula used under each result. Add a Copy Results button for each. Mobile friendly. No backend."

---

### TOOL 4 — Bill Splitter
**Paste this into Gemini:**
> "Build an Astro page at src/pages/tools/bill-split.astro with two modes. Mode 1 Equal Split: user enters total bill, tip percentage, number of people — show tip amount, total with tip, and amount per person. Mode 2 By Item: user can add people by name, then add items with a price and assign each item to one person or split equally among all — show each person's total including their proportional share of the tip. Add a Reset button. Mobile friendly. No backend."

---

### TOOL 5 — Electrical Calculator
**Paste this into Gemini:**
> "Build an Astro page at src/pages/tools/electrical-calc.astro with three calculators. Calculator 1: Load calculator — user adds appliances from a dropdown of 25 common household items each with typical watts built in (fridge 150W, microwave 1000W, TV 100W, AC 1500W, washing machine 500W, laptop 65W, phone charger 20W, LED bulb 10W, iron 2200W, water heater 3000W, toaster 900W, kettle 2000W, fan 75W, hair dryer 1800W, dishwasher 1800W, vacuum 900W, router 20W, desktop PC 300W, gaming console 200W, electric oven 2000W, coffee maker 1000W, and 4 more common ones) — show total watts and total amps at 240V. Calculator 2: Generator size — user enters total watts, get recommended generator size in kW as the next standard size up. Calculator 3: Breaker size — user enters load watts, get minimum breaker amps using the NEC 80 percent rule. Mobile friendly. No backend."

---

### TOOL 6 — File Renamer
**Paste this into Gemini:**
> "Build an Astro page at src/pages/tools/file-renamer.astro. User pastes a list of filenames one per line into a textarea. Show a panel of toggle options: add a custom prefix, add a custom suffix, replace spaces with hyphens, replace spaces with underscores, make all lowercase, make all uppercase, remove special characters except dots and hyphens, add a sequential number at the start like 001 002 003. Show a live preview of renamed files on the right as toggles change. Copy All button for the output list. Mobile friendly. No backend."

---

### TOOL 7 — Cooking Converter
**Paste this into Gemini:**
> "Build an Astro page at src/pages/tools/cooking-converter.astro. Two sections. Section 1: Ingredient converter — user picks an ingredient from a dropdown of 35 common ones (plain flour, self raising flour, caster sugar, granulated sugar, brown sugar, icing sugar, butter, honey, maple syrup, olive oil, vegetable oil, milk, water, rice, oats, cocoa powder, baking powder, salt, breadcrumbs, desiccated coconut, peanut butter, cream cheese, sour cream, yogurt, cornflour, semolina, almond flour, ground almonds, raisins, chocolate chips, chopped nuts, grated cheese, cream, condensed milk, golden syrup) — each with accurate cup to gram density built in as a lookup table. User enters an amount and picks input unit (cups, tablespoons, teaspoons, ml, grams) and output unit — show converted amount. Section 2: Recipe scaler — user pastes ingredients list one per line like '2 cups flour', enters original servings and target servings, get scaled amounts. Mobile friendly. No backend."

---

### TOOL 8 — HVAC Calculator
**Paste this into Gemini:**
> "Build an Astro page at src/pages/tools/hvac-calc.astro with two calculators. Calculator 1: Room ventilation — user enters room length, width, ceiling height in metres, picks room type from dropdown (bedroom needs 1 ACH, living room 2, kitchen 7.5, bathroom 8, office 3, gym 8, basement 1) — show required CFM and air changes per hour with the formula shown. Calculator 2: Duct sizing — user enters required CFM and picks velocity (low noise 500 FPM, standard 750 FPM, high flow 1000 FPM) — show recommended round duct diameter in inches and rectangular duct size options. Mobile friendly. No backend."

---

### TOOL 9 — Voice Transcriber (AI tool)
**Paste this into Gemini:**
> "Build an Astro page at src/pages/tools/transcribe.astro. Install @huggingface/transformers if not already installed. Before loading any model show two big buttons side by side: 'Quick — English only, 40MB' and 'Accurate — Better for accents, 145MB'. When user clicks one, load either Xenova/whisper-tiny.en or Xenova/whisper-base.en — load it inside a Web Worker JavaScript file at public/workers/transcribe-worker.js — never on the main thread. Pass messages between page and worker using postMessage. Show a real download progress bar using the pipeline progress_callback option showing percentage downloaded. After model loads show a red Record button using the MediaRecorder API and also a file upload input that accepts audio files. After transcription show the text in a scrollable textarea. Add Copy button and Download as TXT button. If WebGPU is not available fall back to WASM automatically. Mobile friendly. No backend. In astro.config.mjs make sure @huggingface/transformers is in vite optimizeDeps exclude."

---

### TOOL 10 — Document Scanner
**Paste this into Gemini:**
> "Build an Astro page at src/pages/tools/scan-to-text.astro. Install tesseract.js if not already installed. User uploads or drags and drops an image of a document. Before running OCR apply a canvas preprocessing step: convert to grayscale, increase contrast, apply a threshold to make text sharper — this improves accuracy on photos of documents. Run Tesseract.js recognize function with a language selector dropdown offering English, Spanish, French, German, Hindi, Arabic. Show a progress bar during recognition. Output the text in an editable textarea — add a note that OCR is not perfect and users can fix mistakes. Add Copy and Download as TXT buttons. Mobile friendly. No backend."

---

### TOOL 11 — Voice Memo Cleaner
**Paste this into Gemini:**
> "Build an Astro page at src/pages/tools/voice-cleanup.astro. Install @huggingface/transformers if not already installed. Load Xenova/whisper-tiny.en inside a Web Worker at public/workers/cleanup-worker.js with WebGPU and WASM fallback. Show progress bar during model download. User records audio with a Record button using MediaRecorder or uploads an audio file. Transcribe with Whisper. Then run a JavaScript cleanup pass on the transcript text: remove filler words (um, uh, er, like, you know, so, basically, literally, right, okay at start of sentences), remove consecutive duplicate words, remove obvious false starts (a word that appears twice in a row at the start of a clause). Show raw transcript and cleaned transcript side by side in two textareas. Copy and Download TXT buttons for both. Mobile friendly. No backend. In astro.config.mjs make sure @huggingface/transformers is in vite optimizeDeps exclude."

---

### TOOL 12 — Background Remover
**Paste this into Gemini:**
> "Build an Astro page at src/pages/tools/remove-bg.astro. Install @huggingface/transformers if not already installed. User uploads or drags and drops a photo. Load briaai/RMBG-1.4 model inside a Web Worker at public/workers/rmbg-worker.js with WebGPU and WASM fallback. Show a real download progress bar on first model load. Run the image through the image segmentation pipeline. Show the result as a transparent PNG rendered on a canvas element. Add a Download PNG button. Add a colour picker below the canvas so user can pick a solid background colour to replace transparency — update the canvas preview live when they pick a colour. Mobile friendly. No backend. In astro.config.mjs make sure @huggingface/transformers is in vite optimizeDeps exclude."

---

### TOOL 13 — Photo Translator
**Paste this into Gemini:**
> "Build an Astro page at src/pages/tools/photo-translate.astro. Install @huggingface/transformers and tesseract.js if not already installed. Four steps shown clearly on the page. Step 1: user uploads a photo. Step 2: run Tesseract.js OCR in its built-in worker to extract text — show a progress bar. Step 3: user picks target language from a dropdown of 12 common languages — for Spanish, French, German, Italian, Portuguese, Dutch, Russian, Chinese, Japanese, Korean use specific Xenova/opus-mt models, for any other language use Xenova/nllb-200-distilled-600M as fallback — run translation in a Web Worker at public/workers/translate-worker.js with WebGPU and WASM fallback, show progress bar for model download. Step 4: show original extracted text and translated text side by side, both copyable. Mobile friendly. No backend. In astro.config.mjs make sure @huggingface/transformers is in vite optimizeDeps exclude."

---

### TOOL 14 — Live Captions
**Paste this into Gemini:**
> "Build an Astro page at src/pages/tools/live-captions.astro. Install @huggingface/transformers if not already installed. Load Xenova/whisper-tiny.en in a Web Worker at public/workers/captions-worker.js with WebGPU and WASM fallback. Show download progress on first load. Two modes with a tab switcher. Mode 1 Live Mic: a Start Captions button that uses MediaRecorder to capture microphone audio in 5 second chunks, send each chunk to the worker for transcription, display captions as rolling text — new text appears at bottom, older text scrolls up, always show last 30 seconds of captions, show a blinking red dot while recording. Mode 2 Video File: user uploads a local video file, extract its audio using Web Audio API and OfflineAudioContext, process through same Whisper pipeline, show full transcript when done. Add a Copy All Captions button for both modes. Show a note that captions are near-real-time not instant. Mobile friendly. No backend. In astro.config.mjs make sure @huggingface/transformers is in vite optimizeDeps exclude."

---

### TOOL 15 — Document Anonymizer
**Paste this into Gemini:**
> "Build an Astro page at src/pages/tools/anonymize.astro. Install @huggingface/transformers if not already installed. User pastes text into a textarea or uploads a TXT file. Load Xenova/bert-base-NER in a Web Worker at public/workers/ner-worker.js with WebGPU and WASM fallback. Show download progress bar. After running NER to find names, locations, and organisations — also run JavaScript regex to find email addresses and phone numbers. Replace all found entities with labels: [NAME], [LOCATION], [ORGANISATION], [EMAIL], [PHONE]. Show original text and anonymized text side by side. Below both texts show a list of everything that was found and replaced so user can review — add an Undo button next to each found item in case of false positives that puts the original word back. Copy and Download TXT buttons for anonymized version. Mobile friendly. No backend. In astro.config.mjs make sure @huggingface/transformers is in vite optimizeDeps exclude."

---

### TOOL 16 — Text Summarizer
**Paste this into Gemini:**
> "Build an Astro page at src/pages/tools/summarize.astro. Install @huggingface/transformers if not already installed. Before loading anything show two big option cards: Option 1 'Quick Summary — 300MB one-time download' using Xenova/distilbart-cnn-12-6, Option 2 'Detailed Summary with action items — 500MB one-time download' using onnx-community/Qwen3-0.6B-ONNX. Show a clear warning that these are large one-time downloads that cache in the browser forever after. When user picks one, load that model in a Web Worker at public/workers/summarize-worker.js with WebGPU and WASM fallback. Show a real download progress bar with MB downloaded and percentage. User pastes text or uploads a TXT file. If text is longer than 1000 words, split it into chunks, summarize each chunk, then combine. Show output as 5 bullet point key takeaways. For Option 2 also show a separate Action Items section. Copy and Download TXT buttons. Mobile friendly. No backend. In astro.config.mjs make sure @huggingface/transformers is in vite optimizeDeps exclude."

---

### TOOL 17 — Plant and Object Identifier
**Paste this into Gemini:**
> "Build an Astro page at src/pages/tools/identify.astro. Install @huggingface/transformers if not already installed. Load the smallest available image classification model compatible with Transformers.js v3 — try onnx-community/mobilenetv4_conv_small_050.lamb_in12k_ft_in1k — in a Web Worker at public/workers/identify-worker.js with WebGPU and WASM fallback. Show a progress bar on first model load. User uploads a photo or takes one with their camera — add accept='image/*' capture='environment' to the file input for mobile camera access. Run the image through the classification pipeline. Show top 3 predictions with confidence percentage bars. Under each result add a Search on Wikipedia button that opens a Wikipedia search for that item in a new tab. Add a note: 'Best for common plants, animals and objects — not for medical or allergy decisions.' Mobile friendly. No backend. In astro.config.mjs make sure @huggingface/transformers is in vite optimizeDeps exclude."

---

### HOMEPAGE — Links to all tools
**Build this after you have at least 3 or 4 tools done. Paste into Gemini:**
> "Build an Astro homepage at src/pages/index.astro. Show a clean header with a site name and a one line description like 'Free tools that work on your device — nothing uploaded, no account needed.' Below the header show two sections. Section 1 called 'Instant Tools — no download, works immediately' with cards linking to: Word Counter (/tools/word-count), Password Generator (/tools/password-gen), Concrete Calculator (/tools/concrete-calc), Bill Splitter (/tools/bill-split), Electrical Calculator (/tools/electrical-calc), File Renamer (/tools/file-renamer), Cooking Converter (/tools/cooking-converter), HVAC Calculator (/tools/hvac-calc). Section 2 called 'AI Tools — first visit downloads a small program, then works offline forever' with cards linking to: Voice Transcriber (/tools/transcribe), Document Scanner (/tools/scan-to-text), Voice Memo Cleaner (/tools/voice-cleanup), Background Remover (/tools/remove-bg), Photo Translator (/tools/photo-translate), Live Captions (/tools/live-captions), Document Anonymizer (/tools/anonymize), Text Summarizer (/tools/summarize), Plant and Object Identifier (/tools/identify). Each card shows the tool name, a one sentence description of what it does, and links to the tool page. Clean grid layout. Mobile friendly."

---

## THE PUSH COMMAND — DO THIS AFTER EVERY TOOL

After Gemini builds each tool, go to the Terminal and paste:

```
git add .
git commit -m "add new tool"
git push
```

Wait 60 seconds. Go to your `my-tools-site.pages.dev` URL. Tool is live.

---

## IF GEMINI MAKES AN ERROR

Just paste this into the Gemini chat:

> "I got this error: [paste the error text here]. Fix it."

Gemini will fix it. Then push again.

---

## IF CLOUD SHELL CLOSES OR TIMES OUT

Cloud Shell sleeps after 20 minutes of no activity. If you come back and it looks reset, just paste:

```
cd ~/my-tools-site
```

Your files are still there — Cloud Shell saves them. Then carry on from where you left off.

---

## THE FULL LOOP FOREVER

```
1. Open shell.cloud.google.com
2. cd ~/my-tools-site
3. Click Open Editor
4. Paste a tool prompt into Gemini chat
5. Click Open Terminal
6. git add . && git commit -m "add tool" && git push
7. Wait 60 seconds
8. Tool is live at my-tools-site.pages.dev/tools/[name]
```

---

## BUILD ORDER (easiest to hardest)

| Order | Tool | Why |
|---|---|---|
| 1 | Word Counter | Fastest. Tests your whole setup works. |
| 2 | Password Generator | Still simple. No model. |
| 3 | Concrete Calculator | First multi-calculator page. |
| 4 | Bill Splitter | Teaches adding items dynamically. |
| 5 | Cooking Converter | Teaches lookup tables. |
| 6 | File Renamer | Teaches live preview pattern. |
| 7 | Electrical Calculator | Bigger but same pattern. |
| 8 | HVAC Calculator | Last no-model tool. |
| 9 | Document Scanner | First AI tool — easiest, Tesseract handles workers itself. |
| 10 | Voice Transcriber | Teaches Web Worker + Whisper pattern used in 4 more tools. |
| 11 | Voice Memo Cleaner | Reuses Whisper — already cached from tool 10. |
| 12 | Live Captions | Same Whisper model again. Cached. |
| 13 | Plant Identifier | Small model, easy to test. |
| 14 | Document Anonymizer | New model type — NER. |
| 15 | Photo Translator | Chains OCR + translation together. |
| 16 | Background Remover | Model quality needs testing. |
| 17 | Text Summarizer | Largest download — do last when UX is polished. |

---

## WHAT YOUR LIVE SITE LOOKS LIKE WHEN DONE

```
my-tools-site.pages.dev/                    ← homepage
my-tools-site.pages.dev/tools/word-count
my-tools-site.pages.dev/tools/password-gen
my-tools-site.pages.dev/tools/concrete-calc
my-tools-site.pages.dev/tools/bill-split
my-tools-site.pages.dev/tools/electrical-calc
my-tools-site.pages.dev/tools/file-renamer
my-tools-site.pages.dev/tools/cooking-converter
my-tools-site.pages.dev/tools/hvac-calc
my-tools-site.pages.dev/tools/transcribe
my-tools-site.pages.dev/tools/scan-to-text
my-tools-site.pages.dev/tools/voice-cleanup
my-tools-site.pages.dev/tools/remove-bg
my-tools-site.pages.dev/tools/photo-translate
my-tools-site.pages.dev/tools/live-captions
my-tools-site.pages.dev/tools/anonymize
my-tools-site.pages.dev/tools/summarize
my-tools-site.pages.dev/tools/identify
```

All free. All live. All working on the visitor's own device.
