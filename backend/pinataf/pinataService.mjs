import { PinataSDK } from "pinata";
import dotenv from 'dotenv';
import pdf from "pdf-parse";
import fs from "fs";
import markdownit from 'markdown-it';
import puppeteer from 'puppeteer';

dotenv.config();


const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: "coral-tough-newt-540.mypinata.cloud"
});



console.log("PinataJWT: ", process.env.PINATA_JWT);
console.log("PinataGateway: ", process.env.PINATA_GATEWAY);


export const getFile = async (uniqueName) => {
    try {
        const dict = await getDict(); 
        const cid = dict[uniqueName]; 
        console.log("Cid: ",`${JSON.stringify(cid)}`);
        const { data, contentType } = await pinata.gateways.get(cid);
        //getFileData(`${JSON.stringify(cid)}`);
       

        const pdfBuffer = Buffer.from(await data.arrayBuffer());
        // Load the PDF using PDF.js
        const pdfData = await pdf(pdfBuffer);
        //console.log("extracted Text: ",pdfData.text)
        return pdfData.text;
    } catch (error) {
        console.log("Retrive File Error: ", error);
    }


}

export const createMarkDownPDF = async (textContent) => {
    const md = markdownit();
    const htmlContent = md.render(textContent);
    // Launch puppeteer and generate PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the HTML content in puppeteer
    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

    // Generate PDF
    const pdfBuffer = await page.pdf({
        format: 'A4',
        margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
    });

    await browser.close();

    return pdfBuffer; // Return 
}

export const updateFile = async (markdown_text, fileName) => {
    try {
        //checks for whether the csv already exists is done in controller
        //First call local csv, use sdk to push new file, get cid of the new file, set that as the value at file-name 
        const pdfBytes = await createMarkDownPDF(markdown_text);
        const blob = new Blob([pdfBytes], { type: "text/plain" });
// Create a File from the Blob
        const file = new File([blob], "generated-file.pdf", { type: "text/plain" });
        const response = await pinata.upload.file(file); 
        console.log("File uploaded successfully:", response);

        let dict = await getDict(); 
        dict[fileName] = response.cid; 
        updateDict(dict);
        console.log();
        return response.id;

    } catch (error) {
        console.log("Error updating: ",error);
    }
}


//I need two methods, one for getting a dict from local csv, then another for manipulating that csv 
export const getDict = async () => {


    const csv = await new Promise((resolve, reject) => {
        fs.readFile('localstore.csv', 'utf8', (err, data) => {
            if (err) {
                reject('Error reading the file: ' + err);
            }
            resolve(data);
        });
    });
    

    const rows = csv.split("\n").filter(row => row.trim() !== "");//removes empty rows 
    //const headers = rows[0].split(",");

    if (rows.length === 1) {
        return {};
    }
    
    

    let dictionary = rows.slice(1).reduce((dict, row) => {
        const values = row.split(",");
        const uniqueName = values[0]
        const cid = values[1]

        if (uniqueName && cid) {
            dict[uniqueName] = cid; // Add to dictionary with UniqueName as key and CID as value
        }
        return dict;
    }, {});


    return dictionary;
}

export const updateDict = (dictionary) => {
    if (!dictionary || dictionary.length === 0) {
        // Return headers only when the dictionary is empty
        const csvData = "UniqueName,CID"; // Replace with default headers as needed
        fs.writeFileSync("localstore.csv", csvData, 'utf-8') //saves as .csv file
    }
    const headers = ["UniqueName", "CID"];

    const rows = Object.entries(dictionary).map(([uniqueName, cid]) => {
        // Create a row for each key-value pair in the dictionary
        return `${uniqueName},${cid}`;
    });

    const csvData = [headers.join(","), ...rows].join("\n");
    fs.writeFileSync("localstore.csv", csvData, 'utf-8')
}

export const isFileInDict = async (fileName) => {
    const dict = await getDict(); 
    console.log("dict: ",dict);
    console.log((fileName in dict));
    return (fileName in dict);
}







