import apiManager from "@/services/apiManager";
import { Fincas } from "@/types/fincas";

interface ApiResponse {
  data?: Fincas[] | undefined;
  error?: string;
}

export const getFincas = async (): Promise<ApiResponse> => {
  try {
    const response = await apiManager.get<Fincas[]>("/finca");
    console.log(response);
    return { data: response.data };
  } catch (error: any) {
    // Devolver una acción indicando fallo
    return { error: error.response?.data.message || "Error desconocido" };
  }
};

export const createFincas = async (
  nombre: string,
  comunidad: string,
  areaCacaoProduccion: string,
  areaCacaoDesarrollo: string,
  produccionUltimoSiclo: string,
  IDProductor: number
): Promise<ApiResponse> => {
  try {
    const response = await apiManager.post("/finca", {
      nombre,
      comunidad,
      areaCacaoProduccion,
      areaCacaoDesarrollo,
      produccionUltimoSiclo,
      IDProductor,
    });
    return response.data;
  } catch (error: any) {
    return { error: error.response?.data.message || "Error desconocido" };
  }
};

export const updateFincas = async (
  id: number,
  nombre: string,
  comunidad: string,
  areaCacaoProduccion: string,
  areaCacaoDesarrollo: string,
  produccionUltimoSiclo: string,
  IDProductor: number
): Promise<ApiResponse> => {
  try {
    const response = await apiManager.patch(`/finca/${id}`, {
      nombre,
      comunidad,
      areaCacaoProduccion,
      areaCacaoDesarrollo,
      produccionUltimoSiclo,
      IDProductor,
    });
    return response.data;
  } catch (error: any) {
    return { error: error.response?.data.message || "Error desconocido" };
  }
};

export const deleteFincas = async (id: number): Promise<ApiResponse | void> => {
  try {
    await apiManager.delete(`/finca/${id}`);
  } catch (error: any) {
    return { error: error.response?.data.message || "Error desconocido" };
  }
};
