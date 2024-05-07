
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
  
  export interface IReferral {
    _id: string | null;
    group?: any;
    sender?: any;
    receiver?: any;
    refDate?: string;
    status?: string;
    desc?: string;
    price?: number;
    payStatus?: boolean;
  }
  
  export interface IBaseInputFieldProps {
    type: string;
    _id: string;
    placeholder: string;
    autoFocus: boolean;
    required: boolean;
    label: string;
    register: any;
    error: string | undefined;
  }
  
  export interface IBaseTextarea {
    _id: string;
    placeholder: string;
    row: number;
    label: string;
    required: boolean;
    register: any;
    error: string | undefined;
  }
  
  export interface IBaseToogleProps {
    register: any;
    status: string;
  }
  
  export interface IReferralItemProps {
    referral: IReferral;
  }
  
  export interface IPaginatedReferrals {
    data: IReferral[];
    pageNumber: number | null;
  }
  