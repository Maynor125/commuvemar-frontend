import apiManager from "@/services/apiManager";
import { Ficha } from "@/types/ficha";

interface ApiResponse {
  data?: Ficha[] | undefined;
  error?: string;
}

export const getAllFichas = async (): Promise<ApiResponse> => {
  try {
    const response = await apiManager.get<Ficha[]>("/ficha");
    return { data: response.data };
  } catch (error: any) {
    // Devolver una acción indicando fallo
    return { error: error.response?.data.message || "Error desconocido" };
  }
};

export const getFichasID = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await apiManager.get<Ficha[]>(`/ficha/${id}`);
    return { data: response.data };
  } catch (error: any) {
    // Devolver una acción indicando fallo
    return { error: error.response?.data.message || "Error desconocido" };
  }
};

export const deleteFicha = async (id: number): Promise<ApiResponse | void> => {
  try {
    await apiManager.delete(`/ficha/${id}`);
  } catch (error: any) {
    return { error: error.response?.data.message || "Error desconocido" };
  }
};
