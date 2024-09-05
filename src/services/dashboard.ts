import apiManager from "@/services/apiManager";

export const getInspectorsDashboard = async(fechaInicio:Date,fechaFinal:Date)=>{
    try {
        const response = await apiManager.get('/dashboard',{data : {fechaInicio,fechaFinal}});
        return {data:response.data};
    } catch (error:any) {
        return { error: error.response?.data.message || "Error desconocido" };
    }
}