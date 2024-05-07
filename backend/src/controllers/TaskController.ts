import { NextFunction, Request, Response } from 'express';
import { TaskRepository } from '../repositories';
import { TaskService } from '../service';

export async function createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await TaskRepository.create(req.body);
      res.status(201).send(task);
    } catch (error) {
      next(error);
  }
}

export async function getAllTasks(req: Request, res: Response, next: NextFunction) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const { paginatedData, nextPage } = await TaskService.fetchPaginatedData(page, limit);
        
        res.status(200).send({
          data: paginatedData,
          pageNumber: nextPage
        });
    } catch (error) {
        next(error);
  }
}

export async function getTask(req: Request, res: Response, next: NextFunction) {
    try {
        const task = await TaskRepository.findById(req.params.id);
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.status(200).send(task);
    } catch (error) {
        next(error);
  }
}

export async function updateTask(req: Request, res: Response, next: NextFunction) {
    try {
        const task = await TaskRepository.update(req.params.id, req.body);
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.status(200).send(task);
    } catch (error) {
        next(error);
  }
}

export async function deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
        const task = await TaskRepository.delete(req.params.id);
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
  }
}
