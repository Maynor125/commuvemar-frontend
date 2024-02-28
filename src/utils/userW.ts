import apiManager from "@/services/apiManager";
import { User } from "@/types/user";

interface ApiResponse {
  data?: User[] | undefined;
  error?: string;
}

export const getAllUsers = async (): Promise<ApiResponse> => {
  try {
    const response = await apiManager.get<User[]>("/users");

    return { data: response.data };
  } catch (error: any) {
    // Devolver una acción indicando fallo
    return { error: error.response?.data.message || "Error desconocido" };
  }
};

export const createUsers = async (
  email: string,
  role: string,
  hash: string,
  IDTrabajador: number
): Promise<ApiResponse> => {
  try {
    const response = await apiManager.post("/users", {
      email,
      role,
      hash,
      IDTrabajador,
    });
    return response.data;
  } catch (error: any) {
    return { error: error.response?.data.message || "Error desconocido" };
  }
};

export const updateUsers = async (
  id: number,
  email: string,
  role: string,
  hash: string,
  IDTrabajador: number
): Promise<ApiResponse> => {
  try {
    const response = await apiManager.post(`/users/${id}`, {
      id,
      email,
      role,
      hash,
      IDTrabajador,
    });
    return response.data;
  } catch (error: any) {
    return { error: error.response?.data.message || "Error desconocido" };
  }
};

export const deleteUsers = async (id: number): Promise<ApiResponse | void> => {
  try {
    await apiManager.delete(`/users/${id}`);
  } catch (error: any) {
    return { error: error.response?.data.message || "Error desconocido" };
  }
};
