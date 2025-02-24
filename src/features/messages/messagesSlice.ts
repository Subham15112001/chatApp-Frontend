import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateTypes {
    senderId:number|null|undefined,
    roomId:number|null|undefined,
    messages:any[]
}

export type saveSenderTypes = Omit<initialStateTypes,"messages">
export type saveMessagesType = Pick<initialStateTypes,"messages">

const initialState:initialStateTypes = {
    senderId:null,
    roomId:null,
    messages:[]
}

const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        saveSender:(state,action:PayloadAction<saveSenderTypes>) => {
            state.senderId = action.payload.senderId
            state.roomId = action.payload.roomId
        },
        saveMessages:(state,action:PayloadAction<saveMessagesType>) => {
            state.messages = action.payload.messages
        },
        clearMessages:(state) => {
            state.messages = []
            state.roomId = null
            state.senderId = null
        }
    }
})

export const { saveMessages,saveSender,clearMessages } = messageSlice.actions

export default messageSlice.reducer