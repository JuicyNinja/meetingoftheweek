import { IUser } from "./user";

export enum GroupModalStatus {
    OPEN = "open",
    EDIT = "edit",
    CLOSE = "close",
    REMOVE = "remove",
  }
  
  export interface IModalStatusWithId {
    modalStatus: GroupModalStatus;
    currentId: string | undefined;
  }
  
  export interface IGroup {
    _id: string | null;
    name?: string;
    location?: string;
    owner?: string;
    logo?: string | null ;
    counterMember?:number;
    groupSize?:number;
    profileStatus?: boolean;
    ownerInfo?: any;
    meetingInfo?: any;
    message?: string;
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
  }
  
  export interface IGroupItemProps {
    group: IGroup;
  }
  
  export interface IPaginatedGroups {
    data: IGroup[];
    pageNumber: number | null;
  }

  export interface IMember {
    _id: string | null;
    group_id?: any;
    user_id?: any;
    seat?: string;
    clanStatus?: boolean;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface IPaginatedGroupMembers {
    data: IMember[];
    pageNumber: number | null;
  }
  