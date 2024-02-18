import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProductorInterface {
  isEdit: boolean;
  id: number;
  nombre: string;
  apellido: string;
  numeroCedula: string;
  numeroTelefono: string;
  estado: number;
}

const initialState: ProductorInterface = {
  isEdit: false,
  id: 0,
  nombre: "",
  apellido: "",
  numeroCedula: "",
  numeroTelefono: "",
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
