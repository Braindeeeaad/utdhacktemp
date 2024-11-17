import {getFile,createMarkDownPDF,updateFile,isFileInDict} from './pinataService.mjs';
import { combineText } from './sambacall.mjs';

export const handleAddPinataRequest = async (req, res) => {
    try {
        const { ocrText, uniqueName } = req.body;
        if (!ocrText || !uniqueName) {
            return res.status(400).json({ error: 'Missing required OCR text or uniqueName' });
        }
        if(!(await isFileInDict(uniqueName))){
            const result = await updateFile(ocrText,uniqueName); 
            return res.status(200).json({result: 'New file made successfuly',result});
        }
        
        //check if unqiueName already exists in the dict, if it does, do the replace method, if not do the add method 
        const text_from_pinata_pdf = await getFile(uniqueName); 
        console.log("text_from_pinata_pdf",text_from_pinata_pdf);
        const markdown_text = await combineText(text_from_pinata_pdf,ocrText); 
        const result = await updateFile(markdown_text,uniqueName); 
        return res.status(200).json({result: 'New file updated successfuly',result})
        

    } catch (error) {
        console.error('OCR Controller Error:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};

export const handleGetPinataRequest = async (req, res) => {
    try {
        const { uniqueName } = req.params; // Get uniqueName from the request parameters

        if (!uniqueName) {
            return res.status(400).json({ error: 'Missing required uniqueName' });
        }

        // Fetch the file content using the uniqueName
        const fileContent = await getFileByUniqueName(uniqueName);

        // Return the file content as response
        return res.status(200).json({ result: 'File retrieved successfully', fileContent });
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};