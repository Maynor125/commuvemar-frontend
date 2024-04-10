import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SectionInterface {
    id:number;
  nombre: string;
  descripcion: string;
}

const initialState: SectionInterface={
    id:0,
    nombre:'',
    descripcion:'',
}

const sectionSlice = createSlice({
    name:'sections',
    initialState,
    reducers:{
        updateValueSection(state, action: PayloadAction<Partial<SectionInterface>>) {
            return { ...state, ...action.payload };
          },
          clearValueSection(state) { 
            return initialState;
          },
    }
})

export const {updateValueSection,clearValueSection} = sectionSlice.actions;
export default sectionSlice.reducer;