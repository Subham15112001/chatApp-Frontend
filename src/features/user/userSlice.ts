import { createAsyncThunk,createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDataType {
    id: number,
    name: string,
    email: string
}

interface UserTypes {
    status:boolean,
    userData:UserDataType|null
}



const initialState:UserTypes = {
    status:false,
    userData:null
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        login:(state,action:PayloadAction<UserDataType>) => {
            state.status = true
            state.userData = action.payload
        },
        logout:(state) => {
            state.status = false
            state.userData = null
        },
        updateData:(state,action:PayloadAction<UserDataType>) => {
            state.userData = action.payload
        }
    }
})

export const { login,logout,updateData } = userSlice.actions

export default userSlice.reducer