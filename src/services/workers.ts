import apiManager from "@/services/apiManager";
import { Workers } from "@/types/inspectors";
import { Productors } from "@/types/productors";
import { MemoryStoredFile } from "nestjs-form-data";

interface ApiResponse {
  data?: Workers[] | undefined;
  error?: string;
}

interface ApiResponse2 {
  data?: Productors[] | undefined;
  error?: string;
}

export const getWorkers = async (): Promise<ApiResponse> => {
  try {
    const response = await apiManager.get<Workers[]>("/trabajador");

    return { data: response.data };
  } catch (error: any) {
    // Devolver una acción indicando fallo
    return { error: error.response?.data.message || "Error desconocido" };
  }
};

export const getWorkersId = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await apiManager.get<Workers[]>(`/trabajador/${id}`);
    return { data: response.data };
  } catch (error: any) {
    // Devolver una acción indicando fallo
    return { error: error.response?.data.message || "Error desconocido" };
  }
};

export const getProductorsWorker = async (id: number): Promise<ApiResponse2> => {
  try {
    const response = await apiManager.get<Productors[]>(`trabajador/getproductor/${id}`);
    return { data: response.data };
  } catch (error:any) {
    // Devolver una acción indicando fallo
    return { error: error.response?.data.message || "Error desconocido" };
  }
}

export const createWorkers = async (
  nombre: string,
  apellido: string,
  numeroTelefono: string,
  urlImg: ArrayBuffer
) => {
  try {
    console.log("La imagen es: ", urlImg);
    const response = await apiManager.post("/trabajador", {
      nombre,
      apellido,
      numeroTelefono,
      urlImg,
    });
    return response.data;
  } catch (error: any) {
    console.error(error.response?.data.message);
    return { error: error.response?.data.message || "Error desconocido" };
  }
};

export const createWorkerProductor = async(trabajador:number,productor:number)=>{
  try {
    const response = await apiManager.post("/trabajador/asignacionproductor",{
      trabajador,
      productor,
    });
    return response.data;
  } catch (error:any) {
    return { error: error.response?.data.message || "Error desconocido" };
  }
}

export const updateWorkers = async (
  id: number,
  nombre: string,
  apellido: string,
  numeroTelefono: string,
  urlImg: string
): Promise<ApiResponse> => {
  try {
    const response = await apiManager.patch(`/trabajador/${id}`, {
      nombre,
      apellido,
      numeroTelefono,
      urlImg,
    });
    return response.data;
  } catch (error: any) {
    return { error: error.response?.data.message || "Error desconocido" };
  }
};

export const deleteWorkers = async (
  id: number
): Promise<ApiResponse | void> => {
  try {
    await apiManager.delete(`/trabajador/${id}`);
  } catch (error: any) {
    return { error: error.response?.data.message || "Error desconocido" };
  }
};
