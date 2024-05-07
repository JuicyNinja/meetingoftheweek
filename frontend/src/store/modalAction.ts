import modalSlice from "./modalSlice";
import { IModalStatusWithId } from "../types";


const modalStatusActions = modalSlice.actions;

export const changeModalStatus = (modalStatusWithId: IModalStatusWithId)=> {
    return(modalStatusActions.setModalStatus(modalStatusWithId))
}
