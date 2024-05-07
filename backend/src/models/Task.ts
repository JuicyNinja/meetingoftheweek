import mongoose from 'mongoose';
import { ITask } from '../types';

const taskSchema = new mongoose.Schema({
  title: String,
  desc: String,
  taskStatus: Boolean,
}, { timestamps: true });

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
