import express, { Router } from 'express';
import * as meetingController from '../controllers';

const meetingrouter: Router = express.Router();

meetingrouter.get('/recent', meetingController.getRecentMeeting);
meetingrouter.post('/', meetingController.createMeeting);
meetingrouter.get('/', meetingController.getAllMeetings);
meetingrouter.get('/:id', meetingController.getMeeting);
meetingrouter.put('/:id', meetingController.updateMeeting);
meetingrouter.delete('/:id', meetingController.deleteMeeting);

export default meetingrouter;
