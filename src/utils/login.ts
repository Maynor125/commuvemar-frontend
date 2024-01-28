import apiManager from "@/services/apiManager";
import { setCredentials } from "@/redux/features/authSlice";
import { AppDispatch } from "@/redux/store/store";

export const login = async (
  dispatch: AppDispatch,
  email: string,
  password: string
) => {
  try {
    const response = await apiManager.post("/auth/signin", {
      email,
      password,
    });
    const token = response.data.access_token;
    console.log(token);

    // Almacena el token en el localStorage
    localStorage.setItem("token", token);

    dispatch(setCredentials(token));
    // Devolver una acción indicando éxito
    return { type: "LOGIN_SUCCESS" };
  } catch (error) {
    console.error("El logeo fallo:", error);

    // Devolver una acción indicando fallo
    return { type: "LOGIN_FAILURE", error: "El logeo fallo" };
  }
};
