import express, { Router } from 'express';
import * as UserController from '../controllers';
import { verifyToken } from '../middleware/authMiddleware';

const userrouter: Router = express.Router();

userrouter.get('/total', verifyToken, UserController.totalUser);
userrouter.get('/recent/count', UserController.recentMemberTotal);
userrouter.post('/',verifyToken, UserController.createUser);
userrouter.get('/', verifyToken, UserController.getAllUsers);
userrouter.get('/:id', verifyToken, UserController.getUser);
userrouter.put('/:id', verifyToken, UserController.updateUser);
userrouter.delete('/:id', verifyToken, UserController.deleteUser);
userrouter.put('/:id/reset', verifyToken, UserController.passwordResetUser);

export default userrouter;
