import { performOCR } from './ocrService.mjs';

export const handleOCRRequest = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        if (!req.file.buffer) {
            return res.status(400).json({ error: 'Invalid image data' });
        }

        const result = await performOCR(req.file.buffer);
        
        if (result.success) {
            res.json({ text: result.text });
        } else {
            res.status(500).json({ error: result.error });
        }
    } catch (error) {
        console.error('OCR Controller Error:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};