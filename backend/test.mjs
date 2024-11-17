import { updateDict, updateFile, getFile } from "./utils/pinataConfig.mjs";

//const response =  await getFileUrl("bafkreig2iidlc6mdt6szzknqfujdefvr6pcsacqabc45w6p4igdfkr3qly"); 
//console.log("response:",response); 


//await makeGroup()

//const result = await updateFile("hello baba","hello vro");
const result = await getFile("hello vro");

console.log("Result",result);
