import axios from 'axios'




export const combineText = async (text1,text2) => {
    try {
        const data = {
            text1: "hello betta",
            text2: "how are you"
        };
        
        const response = await axios.post('http://127.0.0.1:5000/process', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log("response data: ",response.data);
    } catch (error) {
        console.log("Retrive File Error: ", error);
    }

}
