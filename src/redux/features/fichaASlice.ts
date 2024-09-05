import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fichaAnalizada: false
};

const fichaAnalizadaSlice = createSlice({
  name: 'fichaAnalizada',
  initialState,
  reducers: {
    setFichaAnalizada: (state, action) => {
      state.fichaAnalizada = action.payload;
    }
  }
});

export const { setFichaAnalizada } = fichaAnalizadaSlice.actions;
export default fichaAnalizadaSlice.reducer;