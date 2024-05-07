export enum MeetingModalStatus {
    OPEN = "open",
    EDIT = "edit",
    CLOSE = "close",
    REMOVE = "remove",
  }
  
  export interface IModalStatusWithId {
    modalStatus: MeetingModalStatus;
    currentId: string | undefined;
  }
  
  export interface IMeeting {
    _id: string | null;
    meetingname: string;
    group: string;
    owner: string;
    meetingtime: string;
    meetinglink: string;
    meetingStatus: boolean;
    createdAt?: string | number | Date
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
  
  export interface IMeetingItemProps {
    meeting: IMeeting;
  }
  
  export interface IPaginatedMeetings {
    data: IMeeting[];
    pageNumber: number | null;
  }
  