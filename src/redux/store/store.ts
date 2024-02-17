'use client'
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from '../features/themeSlice'
import authReducer from '../features/authSlice'
import fincaReducer from '../features/fincaSlice'

import { TypedUseSelectorHook,useSelector } from "react-redux";

export const store = configureStore({
    reducer:{
       theme:themeReducer,
       auth:authReducer,
       finca:fincaReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector