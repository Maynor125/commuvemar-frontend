import apiManager from "@/services/apiManager";
import { datoInterface } from "@/types/dato";

interface ApiResponse {
    data?:datoInterface[] | undefined;
    error?:string;
}

export const getDatosSection = async (id: number): Promise<ApiResponse> => {
    try {
      const response = await apiManager.get<datoInterface[]>(`/seccionesFicha/datoseccion/${id}`);
      return { data: response.data };
    } catch (error:any) {
      // Devolver una acción indicando fallo
      return { error: error.response?.data.message || "Error desconocido" };
    }
}

export const createDato = async (
    titulo: string,
    descripcion: string,
    IDSeccionesFicha:number
  ): Promise<ApiResponse> => {
    try {
      const response = await apiManager.post("/datos", {
        titulo,
        descripcion,
        IDSeccionesFicha
      });
      return response.data;
    } catch (error: any) {
      return { error: error.response?.data.message || "Error desconocido" };
    }
  };

  export const updateDato = async (
    id: number,
    titulo: string,
    descripcion: string,
    IDSeccionesFicha:number
  ): Promise<ApiResponse> => {
    try {
      const response = await apiManager.patch(`/dato/${id}`, {
        titulo,
        descripcion,
        IDSeccionesFicha
      });
      return response.data;
    } catch (error: any) {
      return { error: error.response?.data.message || "Error desconocido" };
    }
  };

  export const deleteDato = async (
    id: number
  ): Promise<ApiResponse | void> => {
    try {
      await apiManager.delete(`/dato/${id}`);
    } catch (error: any) {
      return { error: error.response?.data.message || "Error desconocido" };
    }
  };
  