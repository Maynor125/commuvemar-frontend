import apiManager from "@/services/apiManager";
import { infoDatoInterface } from "@/types/informacionDato";

interface ApiResponse{
    data?:infoDatoInterface[] | undefined;
    error?:string;
}

export const getAllInfoDato = async():Promise<ApiResponse>=>{
  try {
    const response = await apiManager.get<infoDatoInterface[]>('/informaciondato');
    return {data:response.data}
  } catch (error:any) {
    // Devolver una acción indicando fallo
    return { error: error.response?.data.message || "Error desconocido" };
  }
}

export const getInfoDatoFicha = async(id:number):Promise<ApiResponse>=>{
    try {
        const response = await apiManager.get<infoDatoInterface[]>(`/informaciondato/fichainfo/${id}`);
        return {data:response.data}
    } catch (error:any) {
        // Devolver una acción indicando fallo
    return { error: error.response?.data.message || "Error desconocido" };
    }
}
