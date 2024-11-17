import { createWorker } from 'tesseract.js';

export const performOCR = async (imageBuffer) => {
    try {
        const worker = await createWorker();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');

        const { data: { text } } = await worker.recognize(imageBuffer);
        await worker.terminate();

        return { success: true, text };
    } catch (error) {
        console.error('OCR Error:', error);
        return { success: false, error: 'Failed to process image' };
    }
};