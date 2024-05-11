import { infoDatoInterface } from '@/types/informacionDato';
import { createSlice } from '@reduxjs/toolkit';

export interface InfoDatoState {
  data: infoDatoInterface[];
}

const initialState: InfoDatoState = {
  data: [],
};

const infoDatosSlice = createSlice({
    name:'infoDatos',
    initialState,
    reducers:{
        setInfoDato: (state, action) => {
            state.data = action.payload;
          },
    }
})

export const {setInfoDato} = infoDatosSlice.actions;
export default infoDatosSlice.reducer;