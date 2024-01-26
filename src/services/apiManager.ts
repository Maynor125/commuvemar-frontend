import axios from "axios";
 
const apiManager = axios.create({
    baseURL:"http://localhost"
})

export default apiManager;