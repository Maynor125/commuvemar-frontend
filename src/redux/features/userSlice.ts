import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserInterface {
  isEdit: boolean;
  isDelete: boolean;
  id: number;
  email: string;
  rol: string;
  hash: string;
  IDTrabajador: number;
  trabajador:string;
}

const initialState: UserInterface = {
    isEdit: false,
    isDelete: false,
    id: 0,
    email:'',
    rol: '',
    hash: '',
    IDTrabajador:0,
    trabajador: '',
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        updateValueUser(state,action: PayloadAction<Partial<UserInterface>>){
            return { ...state, ...action.payload };
        },
        clearValueUser(state) {
            return initialState;
          },
    }
})

export const {updateValueUser,clearValueUser} = userSlice.actions;
export default userSlice.reducer;