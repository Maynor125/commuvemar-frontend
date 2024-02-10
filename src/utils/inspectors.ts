import apiManager from "@/services/apiManager";
import { Inspectors } from "@/types/inspectors";

interface ApiResponse {
  data?: Inspectors[] | undefined;
  error?: string;
}

export const getInspectors = async (): Promise<ApiResponse> => {
  try {
    const response = await apiManager.get<Inspectors[]>("/inspector");

    return { data: response.data };
  } catch (error: any) {
    // Devolver una acción indicando fallo
    return { error: error.response?.data.message || "Error desconocido" };
  }
};

export const getInspectorsId = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await apiManager.get<Inspectors[]>(`/inspector/${id}`);
    return { data: response.data };
  } catch (error: any) {
    // Devolver una acción indicando fallo
    return { error: error.response?.data.message || "Error desconocido" };
  }
};

export const createInspectors = async (
  nombre: string,
  apellido: string,
  numeroTelefono: string
): Promise<ApiResponse> => {
  try {
    const response = await apiManager.post("/inspector", {
      nombre,
      apellido,
      numeroTelefono,
    });
    return response.data;
  } catch (error: any) {
    return { error: error.response?.data.message || "Error desconocido" };
  }
};

export const updateInspectors = async (
  id: number,
  nombre: string,
  apellido: string,
  numeroTelefono: string
): Promise<ApiResponse> => {
  try {
    const response = await apiManager.patch(`/inspector/${id}`, {
      nombre,
      apellido,
      numeroTelefono,
    });
    return response.data;
  } catch (error: any) {
    return { error: error.response?.data.message || "Error desconocido" };
  }
};

export const deleteInspertors = async (
  id: number
): Promise<ApiResponse | void> => {
  try {
    await apiManager.delete(`/inspector/${id}`);
  } catch (error: any) {
    return { error: error.response?.data.message || "Error desconocido" };
  }
};
