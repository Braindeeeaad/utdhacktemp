import express from 'express';
import multer from 'multer';
import { handleOCRRequest } from './ocrController.mjs';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

router.post('/process', upload.single('image'), handleOCRRequest);

export default router;