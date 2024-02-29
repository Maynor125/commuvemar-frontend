import apiManager from "@/services/apiManager";
import { Workers } from "@/types/inspectors";

interface ApiResponse {
  data?: Workers[] | undefined;
  error?: string;
}

export const getUser = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await apiManager.get<Workers[]>(`/trabajador/user/${id}`);
    return { data: response.data };
  } catch (error: any) {
    // Devolver una acción indicando fallo
    return { error: error.response?.data.message || "Error desconocido" };
  }
};



