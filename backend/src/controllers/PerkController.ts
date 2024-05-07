import { NextFunction, Request, Response } from 'express';
import { PerkRepository } from '../repositories';
import { log } from 'console';

export async function createPerk(req: Request, res: Response, next: NextFunction) {
    try {
      const perk = await PerkRepository.create(req.body);
      res.status(201).send(perk);
    } catch (error) {
      next(error);
  }
}

export async function getAllPerks(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req.query.userId != null && req.query.userId != "") ? req.query.userId : req.body.user_id;
        const data = await PerkRepository.findByUserId(userId);
        
        res.status(200).send(data);
    } catch (error) {
        next(error);
  }
}

export async function getPerk(req: Request, res: Response, next: NextFunction) {
    try {
        const perk = await PerkRepository.findById(req.params.id);
        if (!perk) {
            return res.status(404).send({ message: 'Perk not found' });
        }
        res.status(200).send(perk);
    } catch (error) {
        next(error);
  }
}

export async function updatePerk(req: Request, res: Response, next: NextFunction) {
    try {
        const perk = await PerkRepository.update(req.params.id, req.body);
        console.log(req.body);
        if (!perk) {
            return res.status(404).send({ message: 'Perk not found' });
        }
        res.status(200).send(perk);
    } catch (error) {
        next(error);
  }
}

export async function deletePerk(req: Request, res: Response, next: NextFunction) {
    try {
        const perk = await PerkRepository.delete(req.params.id);
        if (!perk) {
            return res.status(404).send({ message: 'Perk not found' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
  }
}
