import apiManager from "@/services/apiManager";
import { Productors } from "@/types/productors";

interface ApiResponse {
  data?: Productors[] | undefined;
  error?: string;
}

export const getProductors = async (): Promise<ApiResponse> => {
  try {
    const response = await apiManager.get<Productors[]>("/productores");
    console.log(response);
    return { data: response.data };
  } catch (error: any) {
    return { error: error.response?.data.message || "Error desconocido" };
  }
};

export const getProductorsId = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await apiManager.get<Productors[]>(`/productores/${id}`);
    return { data: response.data };
  } catch (error: any) {
    return { error: error.response?.data.message || "Error desconocido" };
  }
};

export const createProductors = async (
  nombre: string,
  apellido: string,
  numeroCedula: string,
  numeroTelefono: string,
  fechaIngresoPrograma: Date,
  estado: number
): Promise<ApiResponse> => {
  try {
    const response = await apiManager.post("/productores", {
      nombre,
      apellido,
      numeroCedula,
      numeroTelefono,
      fechaIngresoPrograma,
      estado,
    });
    return response.data;
  } catch (error: any) {
    return { error: error.response?.data.message || "Error desconocido" };
  }
};

export const updateProductors = async (
    id:number,
    nombre: string,
    apellido: string,
    numeroCedula: string,
    numeroTelefono: string,
    fechaIngresoPrograma: Date,
    estado: number
  ): Promise<ApiResponse> => {
    try {
      const response = await apiManager.patch(`/productores/${id}`, {
        nombre,
        apellido,
        numeroCedula,
        numeroTelefono,
        fechaIngresoPrograma,
        estado,
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
      await apiManager.delete(`/productores/${id}`);
    } catch (error: any) {
      return { error: error.response?.data.message || "Error desconocido" };
    }
  };