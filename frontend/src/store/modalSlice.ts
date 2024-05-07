import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModalStatusWithId, ModalStatus } from "../types";

const initialModalStatus: IModalStatusWithId = {
    modalStatus: ModalStatus.CLOSE,
    currentId: undefined,
}

const modalSlice = createSlice({
    name: 'modalStatus',
    initialState: initialModalStatus,
    reducers: {
        setModalStatus(state, action: PayloadAction<IModalStatusWithId>) {
            state.modalStatus = action.payload.modalStatus;
            state.currentId = action.payload.currentId;
        },
    }
})

export default modalSlice;