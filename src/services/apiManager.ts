import { selectToken } from "@/redux/features/authSlice";
import { RootState, store, useAppSelector } from "@/redux/store/store";
import axios from "axios";

 
const apiManager = axios.create({
    baseURL:"https://coomuvemar-backend-8d235bf9e499.herokuapp.com/",
    headers: {
        'Content-Type': 'application/json',
        'mode': 'no-cors'
    }
})

apiManager.interceptors.request.use((config) => {
    const token = selectToken(store.getState());
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });


export default apiManager;