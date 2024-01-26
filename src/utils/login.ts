import apiManager from "@/services/apiManager";
import { setCredentials } from "@/redux/features/authSlice";
import { AppDispatch } from "@/redux/store/store";

export const login = async (dispatch: AppDispatch, username: string, password: string) => {
    try {
      const response = await apiManager.post('/auth/login', { username, password });
      const token = response.data.token;
      dispatch(setCredentials(token));
    } catch (error) {
      console.error('El logeo fallo:', error);
    }
  };
  