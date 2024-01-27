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
    console.log(response.data);
    const token = response.data.token;
    console.log(token);
    dispatch(setCredentials(token));
    // Devolver una acción indicando éxito
    return { type: "LOGIN_SUCCESS" };
  } catch (error) {
    console.error("El logeo fallo:", error);

    // Devolver una acción indicando fallo
    return { type: "LOGIN_FAILURE", error: "El logeo fallo" };
  }
};
