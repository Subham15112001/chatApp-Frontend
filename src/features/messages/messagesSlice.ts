import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface messsageType {
    id:number,
    sender:boolean,
    text:string,
    time:string
}

interface initialStateTypes {
    senderId:number|null|undefined,
    roomId:number|null|undefined,
    senderName:string|null|undefined
    messages:messsageType[]
}

export type saveSenderTypes = Omit<initialStateTypes,"messages">

const initialState:initialStateTypes = {
    senderId:null,
    roomId:null,
    senderName:null,
    messages:[]
}

const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        saveSender:(state,action:PayloadAction<saveSenderTypes>) => {
            state.senderId = action.payload.senderId
            state.roomId = action.payload.roomId
            state.senderName = action.payload.senderName
        },
        saveMessages:(state,action:PayloadAction<messsageType[]>) => {
            state.messages = action.payload
        },
        clearMessages:(state) => {
            state.messages = []
            state.roomId = null
            state.senderId = null
        },
        addMessage:(state,action:PayloadAction<messsageType>) => {
            state.messages = [...state.messages,action.payload]
        }
    }
})

export const { saveMessages,saveSender,clearMessages,addMessage } = messageSlice.actions

export default messageSlice.reducer