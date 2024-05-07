export interface ITask extends Document {
    _id: string | null;
    title: string;
    desc: string;
    taskStatus: boolean;
}
  