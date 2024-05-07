import express, { Router } from 'express';
import * as PerkController from '../controllers';
import { verifyToken } from '../middleware/authMiddleware';

const perkrouter: Router = express.Router();

perkrouter.post('/', verifyToken, PerkController.createPerk);
perkrouter.get('/', verifyToken, PerkController.getAllPerks);
perkrouter.get('/:id', verifyToken, PerkController.getPerk);
perkrouter.put('/:id', verifyToken, PerkController.updatePerk);
perkrouter.delete('/:id', verifyToken, PerkController.deletePerk);

export default perkrouter;
