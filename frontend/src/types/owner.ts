
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
  
  export interface IOwner {
    _id: string | null;
    name?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    street?: string;
    zipcode?: string;
    phone?: string;
    email?: string;
    businessName?: string;
    businessEmail?: string;
    businessPhone?: string;
    businessWebsite?: string;
    googleLink?: string;
    profilePhoto?: string;
    businessLogo?: string;
    clan?: any;
    profileStatus?: boolean;
    createdAt?: string;
    updatedAt?: string;
    group_id?: any;
    clanStatus?: boolean;
    isOwner?: boolean;
    seat?: string;
    roles?: string[];
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
  
  export interface IOwnerItemProps {
    owner: IOwner;
  }
  
  export interface IPaginatedOwners {
    data: IOwner[];
    pageNumber: number | null;
  }
  