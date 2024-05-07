import express, { Router } from 'express';
import * as FileController from '../controllers';

const filerouter: Router = express.Router();

filerouter.post('/', FileController.upload);
filerouter.get('/', FileController.getListFiles);
filerouter.get('/:id', FileController.download);

export default filerouter;
