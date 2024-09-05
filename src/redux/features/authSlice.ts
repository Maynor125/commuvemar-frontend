import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  logueado: boolean;
  idUser: number;
  email: string | null;
}

interface Sub {
  idUser: number;
  email: string | null;
}

const initialState: AuthState = {
  token: null,
  logueado: false,
  idUser: 0,
  email: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.logueado = true;
    },
    setInfoUser: (state, action: PayloadAction<AuthState>) => {
      return { ...state, ...action.payload };
    },
    logout: (state) => {
      state.token = null;
      state.logueado = false;
    },
  },
});

export const { setCredentials, logout, setInfoUser } = authSlice.actions;
export const selectToken = (state: any) => state.auth.token;
export default authSlice.reducer;
