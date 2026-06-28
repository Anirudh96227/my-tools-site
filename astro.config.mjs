export default defineConfig({
  // ... other config
  vite: {
    optimizeDeps: {
      exclude: ['@huggingface/transformers', '@xenova/transformers']
    }
  }
});
