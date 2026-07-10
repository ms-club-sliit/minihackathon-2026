import { pipeline, env } from '@xenova/transformers';

// Skip local model check since we want to download from Hugging Face hub
env.allowLocalModels = false;
env.useBrowserCache = true;

class PipelineSingleton {
    static task = 'feature-extraction';
    static model = 'Xenova/all-MiniLM-L6-v2';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
    // We expect the message to have a type and a payload
    const { type, payload } = event.data;

    try {
        // Retrieve the pipeline. When called for the first time,
        // this will load the pipeline and save it for future use.
        let extractor = await PipelineSingleton.getInstance(x => {
            // We also add a progress callback so we can track model downloading
            self.postMessage({ type: 'progress', payload: x });
        });

        if (type === 'load') {
            self.postMessage({ type: 'ready' });
        } else if (type === 'embed') {
            const { id, text } = payload;
            // Compute embeddings
            let output = await extractor(text, { pooling: 'mean', normalize: true });

            // Send the output back to the main thread
            self.postMessage({
                type: 'embed_result',
                payload: { id, embedding: Array.from(output.data) }
            });
        }
    } catch (e) {
        self.postMessage({ type: 'error', payload: e.message });
    }
});
