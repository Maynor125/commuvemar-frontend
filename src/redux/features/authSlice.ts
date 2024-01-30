import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  logueado: boolean;
}

const initialState: AuthState = {
  token: null,
  logueado: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action:PayloadAction<string | null>) => {
      state.token = action.payload;
      state.logueado = true;
    },
    logout: (state) => {
      state.token = null;
      state.logueado = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const selectToken = (state: any) => state.auth.token;
export default authSlice.reducer;
