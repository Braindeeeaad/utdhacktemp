import axios from 'axios'

export const combineText = async (text1,text2) => {
    try {
        const data = {
            text1: text1,
            text2: text2
        };
        
        const response = await axios.post('http://127.0.0.1:5000/process', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log("response data: ",response.data.response);
        return response.data.response
    } catch (error) {
        console.log("Retrive File Error: ", error);
    }

}





/* 
const upload = await pinata.upload
  .file(file)
  .group("b07da1ff-efa4-49af-bdea-9d95d8881103")
*/
