import axios from "axios";
 
const apiManager = axios.create({
    baseURL:"https://l4m6zmns-4000.use2.devtunnels.ms",
    headers: {
        'Content-Type': 'application/json',
        'mode': 'no-cors'
    }
})

export default apiManager;