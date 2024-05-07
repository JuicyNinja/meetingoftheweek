import express, { Router } from 'express';
import * as ownerController from '../controllers';
import { verifyToken } from '../middleware/authMiddleware';

const ownerrouter: Router = express.Router();

ownerrouter.get('/total', verifyToken, ownerController.totalOwner);
ownerrouter.post('/', ownerController.createOwner);
ownerrouter.get('/', ownerController.getAllOwners);
ownerrouter.get('/:id', ownerController.getOwner);
ownerrouter.put('/:id', ownerController.updateOwner);
ownerrouter.delete('/:id', ownerController.deleteOwner);

export default ownerrouter;
