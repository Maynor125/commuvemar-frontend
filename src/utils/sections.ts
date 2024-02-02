import apiManager from "@/services/apiManager";
import { Section } from "@/types/section";

interface ApiResponse {
  data?: Section[] | undefined;
  error?: string;
}

export const getSections = async (): Promise<ApiResponse> => {
  try {
    const response = await apiManager.get<Section[]>("/seccionesFicha");
    console.log(response);
    return { data: response.data };
  } catch (error: any) {
    // Devolver una acción indicando fallo
    return { error: error.response?.data.message || "Error desconocido" };
  }
};

export const getSectionsId = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await apiManager.get<Section[]>(`/seccionesFicha/${id}`);
    return { data: response.data };
  } catch (error: any) {
    // Devolver una acción indicando fallo
    return { error: error.response?.data.message || "Error desconocido" };
  }
};

export const createSection = async (
  nombre: string,
  description: string
): Promise<ApiResponse> => {
  try {
    const response = await apiManager.post("/seccionesFicha", {
      nombre,
      description,
    });
    return response.data;
  } catch (error: any) {
    return { error: error.response?.data.message || "Error desconocido" };
  }
};

export const updateSection = async (
  id: number,
  nombre: string,
  descripcion: string
): Promise<ApiResponse> => {
  try {
    const response = await apiManager.patch(`/seccionesFicha/${id}`, {
      nombre,
      descripcion,
    });
    return response.data;
  } catch (error: any) {
    return { error: error.response?.data.message || "Error desconocido" };
  }
};

export const deleteSection = async (
  id: number
): Promise<ApiResponse | void> => {
  try {
    await apiManager.delete(`/seccionesFicha/${id}`);
  } catch (error: any) {
    return { error: error.response?.data.message || "Error desconocido" };
  }
};
