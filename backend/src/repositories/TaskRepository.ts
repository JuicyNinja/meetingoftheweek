import { Task } from '../models';
import { ITask } from '../types';

class TaskRepository {
    async create(taskData: ITask): Promise<ITask> {
        const task = new Task(taskData);
        return task.save();
    }

    async findAll(): Promise<ITask[]> {
        return Task.find();
    }

    async findById(id: string): Promise<ITask | null> {
        return Task.findById(id);
    }

    async update(id: string, taskData: Partial<ITask>): Promise<ITask | null> {      
        const updatedTaskData = { ...taskData };
        delete updatedTaskData._id;
      
        return Task.findByIdAndUpdate(id, updatedTaskData, { new: true });
      }

    async delete(id: string): Promise<ITask | null> {
      const result = await Task.findByIdAndDelete(id);
      if (!result) {
          return null;
      }
      return result as unknown as ITask;
    }
}

export default new TaskRepository();
