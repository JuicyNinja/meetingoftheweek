import { NextFunction, Request, Response } from 'express';
import { MeetingRepository } from '../repositories';
import { MeetingService } from '../service';


export async function createMeeting(req: Request, res: Response, next: NextFunction) {
    try {
      const meeting = await MeetingRepository.create(req.body);
      res.status(201).send(meeting);
    } catch (error) {
      next(error);
  }
}

export async function getAllMeetings(req: Request, res: Response, next: NextFunction) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const { paginatedData, nextPage } = await MeetingService.fetchPaginatedData(page, limit);
        
        res.status(200).send({
          data: paginatedData,
          pageNumber: nextPage
        });
    } catch (error) {
        next(error);
  }
}

export async function getMeeting(req: Request, res: Response, next: NextFunction) {
    try {
        const meeting = await MeetingRepository.findById(req.params.id);
        if (!meeting) {
            return res.status(404).send({ message: 'Meeting not found' });
        }
        res.status(200).send(meeting);
    } catch (error) {
        next(error);
  }
}

export async function updateMeeting(req: Request, res: Response, next: NextFunction) {
    try {
        const meeting = await MeetingRepository.update(req.params.id, req.body);
        if (!meeting) {
            return res.status(404).send({ message: 'Meeting not found' });
        }
        res.status(200).send(meeting);
    } catch (error) {
        next(error);
  }
}

export async function deleteMeeting(req: Request, res: Response, next: NextFunction) {
    try {
        const meeting = await MeetingRepository.delete(req.params.id);
        if (!meeting) {
            return res.status(404).send({ message: 'Meeting not found' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
  }
}

export async function getRecentMeeting(req: Request, res: Response, next: NextFunction) {
    try {
        let param = {};
        if (req.query.group_id) param = {...param, group: req.query.group_id}
        const meeting = await MeetingRepository.findRecent(param);
        if (!meeting) {
            return res.status(404).send({ message: 'Meeting not found' });
        }
        res.status(200).send(meeting);
    } catch (error) {
        next(error);
  }
}