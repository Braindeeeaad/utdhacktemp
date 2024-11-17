import { performOCR } from './ocrService.mjs';

export const handleOCRRequest = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
    }

    const result = await performOCR(req.file.buffer);
    
    if (result.success) {
        res.json({ text: result.text });
    } else {
        res.status(500).json({ error: result.error });
    }
};