import express from 'express';
import multer from 'multer';
import { handleAddPinataRequest } from './pinataController.mjs';

const router = express.Router();
const storage = multer.memoryStorage();

//Imma add text(from OCR) and the uniquename I want to add it to
router.post('/add', handleAddPinataRequest);

export default router;