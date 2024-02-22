import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProductorInterface {
  isEdit: boolean;
  isDelete: boolean;
  id: number;
  nombre: string;
  apellido: string;
  numeroCedula: string;
  numeroTelefono: string;
  fechaIngresoPrograma:Date;
  estado: number;
}

const initialState: ProductorInterface = {
  isDelete: false,
  isEdit: false,
  id: 0,
  nombre: "",
  apellido: "",
  numeroCedula: "",
  numeroTelefono: "",
  fechaIngresoPrograma:new Date(),
  estado: 0,
};

const productorSlice = createSlice({
  name: "productor",
  initialState,
  reducers: {
    updateValueProductor(
      state,
      action: PayloadAction<Partial<ProductorInterface>>
    ) {
      return { ...state, ...action.payload };
    },
    clearValueProductor(state) {
      return initialState;
    },
  },
});

export const { updateValueProductor,clearValueProductor} = productorSlice.actions;
export default productorSlice.reducer;
