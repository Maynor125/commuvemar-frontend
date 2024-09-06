import { AxiosError } from "axios";

import apiManager from "@/services/apiManager";
import { setCredentials } from "@/redux/features/authSlice";
import { AppDispatch } from "@/redux/store/store";

export const login = async (
  dispatch: AppDispatch,
  email: string,
  password: string
): Promise<{ error?: string } | { type: string }> => {
  try {
    const response = await apiManager.post("/auth/signin", {
      email,
      password,
    });
    console.log(response.data);
    const token = response.data.access_token;
    console.log(token);

    // Almacena el token en el localStorage
    localStorage.setItem("token", token);

    dispatch(setCredentials(token));
    // Devolver una acción indicando éxito
    return { type: "LOGIN_SUCCESS" };
  } catch (error: any) {
    console.error(error.response?.data.message);

    // Devolver una acción indicando fallo
    return { error: error.response?.data.message || "Error desconocido" };
  }
};
