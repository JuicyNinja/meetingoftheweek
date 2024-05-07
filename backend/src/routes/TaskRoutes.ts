import express, { Router } from 'express';
import * as taskController from '../controllers';

const taskrouter: Router = express.Router();

taskrouter.post('/', taskController.createTask);
taskrouter.get('/', taskController.getAllTasks);
taskrouter.get('/:id', taskController.getTask);
taskrouter.put('/:id', taskController.updateTask);
taskrouter.delete('/:id', taskController.deleteTask);

export default taskrouter;
