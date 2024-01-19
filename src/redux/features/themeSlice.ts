import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import useLocalStorage from "../../hooks/useLocalStorage";

const initialState = {
    darkMode:useLocalStorage('darkMode',false)[0],
}

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers:{
     toogleTheme:(state)=>{
        state.darkMode = !state.darkMode;
     }
    }
})

export const {toogleTheme}=themeSlice.actions;
export default themeSlice.reducer;
