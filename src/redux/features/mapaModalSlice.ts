import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MapaInterface{
    idFicha:number,
    openM:boolean,
    latitud:number,
    longitud:number,
}

const initialState :MapaInterface={
 idFicha:0,
 openM:false,
 latitud:0,
 longitud:0,
}

const mapaSlice = createSlice({
    name: "mapa",
    initialState,
    reducers:{
        updateValueMapa(state, action: PayloadAction<Partial<MapaInterface>>) {
            return { ...state, ...action.payload };
          },
          clearValueMapa(state) {
            return initialState;
          },
    }
})

export const {updateValueMapa,clearValueMapa} = mapaSlice.actions;
export default mapaSlice.reducer;