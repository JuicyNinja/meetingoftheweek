
export enum ModalStatus {
    OPEN = "open",
    EDIT = "edit",
    CLOSE = "close",
    REMOVE = "remove",
}
  
export interface IModalStatusWithId {
    modalStatus: ModalStatus;
    currentId: string | undefined;
}
  
export interface IPerk {
    _id: string | null;
    user_id: string | null;
    name: string;
    price: number;
    desc: string;
    terms: string;
}
  
export interface IPerkItemProps {
    perk: IPerk;
}

export interface IPerkListProps {
    user_id: string;
}
