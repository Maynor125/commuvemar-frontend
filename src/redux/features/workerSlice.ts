import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface WorkerInterface {
  isEdit: boolean;
  isDelete: boolean;
  id: number;
  nombre: string;
  apellido: string;
  numeroTelefono: string;
  urlImg: string;
  open:boolean;
}

const initialState: WorkerInterface={
    isDelete: false,
    isEdit: false,
    id:0,
    nombre: "",
    apellido: "",
    numeroTelefono: "",
    urlImg: "",
    open:false,
}

const workerSlice = createSlice({
    name:'worker',
    initialState,
    reducers:{
        updateValueWorker(
            state,
            action:PayloadAction<Partial<WorkerInterface>>
        ){
            return {...state, ...action.payload}
        },
        clearValueWorker(state) {
            return initialState;
          },
    }
})

export const { updateValueWorker,clearValueWorker } = workerSlice.actions;
export default workerSlice.reducer;