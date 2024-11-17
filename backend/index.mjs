import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import ocrRoutes from './ocr/ocrRoutes.mjs';
const app = express();
dotenv.config();

app.use(cors({
    origin: '*',
    credentials: true
}));

app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
    );
    next();
});

app.use(express.json());

// OCR route
app.use('/api/ocr', ocrRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
});