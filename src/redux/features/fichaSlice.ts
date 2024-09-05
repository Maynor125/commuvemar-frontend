import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FichaInterface{
    AlanizadaFichas:boolean;
    id?:number;
    nombre:string;
    fecha:string;
    email:string;
    finca:string;
    productor:string;
    location: {
        latitud: string;
        longitud: string;
      };
    analizada?:boolean;
}

const initialState : FichaInterface={
    AlanizadaFichas:false,
    id:0,
    nombre:'',
    fecha:'',
    email:'',
    finca:'',
    productor:'',
    location:{
        latitud:'',
        longitud:'',
    },
    analizada:false,
}

const fichasSlice = createSlice({
    name: "Fichas",
    initialState,
    reducers:{
        updateValueFichas(state, action: PayloadAction<Partial<FichaInterface>>) {
            return { ...state, ...action.payload };
          },
          clearValueFichas(state) { 
            return initialState;
          },
    }
})

export const {updateValueFichas,clearValueFichas} = fichasSlice.actions;
export default fichasSlice.reducer;

