import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FichaInterface{
    AlanizadaFichas:boolean;
}

const initialState : FichaInterface={
    AlanizadaFichas:false,
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