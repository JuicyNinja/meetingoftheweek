
export enum ModalStatus {
  OPEN = "open",
  EDIT = "edit",
  CLOSE = "close",
  REMOVE = "remove",
  JOIN = "join",
  CONVERT = "convert",
  RESET = "reset",
}

export interface IModalStatusWithId {
  modalStatus: ModalStatus;
  currentId: string | undefined;
}

export interface ITask {
  _id: string | null;
  title: string;
  desc: string;
  taskStatus: boolean;
}

export interface IBaseInputFieldProps {
  type: string;
  _id: string;
  placeholder?: string;
  autoFocus?: boolean;
  required?: boolean;
  label?: string;
  register?: any;
  error?: string | undefined;
}

export interface IBaseSelectFieldProps {
  _id: string;
  placeholder?: string;
  autoFocus?: boolean;
  required?: boolean;
  label?: string;
  register?: any;
  options?: any[];
  error?: string | undefined;
  readonly?: boolean
  value?: string
  onChange?: (value: string) => void
}

export interface IBaseTextarea {
  _id: string;
  placeholder?: string;
  row?: number;
  label?: string;
  required?: boolean;
  register?: any;
  error?: string | undefined;
}

export interface IBaseToogleProps {
  register: any;
  status: string;
  trueText?: string;
  falseText?: string;
}

export interface ITaskItemProps {
  task: ITask;
}

export interface IPaginatedTasks {
  data: ITask[];
  pageNumber: number | null;
}


export interface IImageUpload {
  _id: string;
  register?: any;
  autoFocus?: boolean;
  required?: boolean;
  logo?: string;
  width?: number;
  height?: number;
}

export interface IBaseDateTimePickerFieldProps {
  _id: string;
  placeholder?: string;
  autoFocus?: boolean;
  required?: boolean;
  label?: string;
  register?: any;
  error?: string | undefined;
}


export interface IBaseSelect2FieldProps {
  _id: string;
  placeholder?: string;
  autoFocus?: boolean;
  required?: boolean;
  label?: string;
  register?: any;
  options?: any[];
  error?: string | undefined;
  readonly?: boolean
  value?: string
  onChange?: (value: string) => void
}

export interface IPages {
  name: string;
  url: string;
}

export interface IAvatarChange {
  _id?: string;
  register?: any;
  url?: string;
  width?: number;
  height?: number;
  btntext?: string;
  filename?: string;
  onFileNameChange?: any;
}