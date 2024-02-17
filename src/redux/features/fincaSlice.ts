import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FincaInterface {
  isEdit: boolean;
  nombre: string;
  comunidad: string;
  areaCacaoProduccion: string;
  areaCacaoDesarrollo: string;
  produccionUltimoSiclo: string;
  IDProductor?: number;
  idFinca?: number;
  productor: string;
}

const initialState: FincaInterface = {
  isEdit: false,
  nombre: "",
  comunidad: "",
  areaCacaoProduccion: "",
  areaCacaoDesarrollo: "",
  produccionUltimoSiclo: "",
  productor: "",
  idFinca: 0,
  IDProductor: 0,
};

const fincaSlice = createSlice({
  name: "finca",
  initialState,
  reducers: {
    updateValueFincas(state, action: PayloadAction<Partial<FincaInterface>>) {
      return { ...state, ...action.payload };
    },
    clearValueFincas(state) {
      return initialState;
    },
  },
});

export const { updateValueFincas, clearValueFincas } = fincaSlice.actions;
export default fincaSlice.reducer;
