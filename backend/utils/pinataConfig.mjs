import { PinataSDK } from "pinata";
import dotenv from 'dotenv';
import pdf from "pdf-parse";
dotenv.config();

const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.PINATA_GATEWAY,
});

console.log("PinataJWT: ", process.env.PINATA_JWT);
console.log("PinataJWT: ", process.env.PINATA_GATEWAY);

export const getFile = async (cid) => {
    try {
        const { data, contentType } = await pinata.gateways.get(cid);

        const pdfBuffer = Buffer.from(await data.arrayBuffer());
        // Load the PDF using PDF.js
        const pdfData = await pdf(pdfBuffer);
        //console.log("extracted Text: ",pdfData.text)
        return pdfData.text;
    } catch (error) {
        console.log("Retrive File Error: ", error);
    }

}

