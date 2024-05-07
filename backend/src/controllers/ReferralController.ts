import { NextFunction, Request, Response } from 'express';
import ReferralRepository from '../repositories/ReferralRepository';
import { ReferralService } from '../service';
import { GroupRepository, UserGroupRepository, UserRepository } from '../repositories';
import { getRecentMonths, getStartAndEndDateFromMonthStr } from '../utils/utils';


export async function createReferral(req: Request, res: Response, next: NextFunction) {
    try {
      const group = await UserGroupRepository.findOneByUser(req.body.user_id);
      const data = {...req.body, sender: req.body.user_id, status: "Pending", payStatus: false, group: group?.group_id}
      const referral = await ReferralRepository.create(data);
      res.status(201).send(referral);
    } catch (error) {
      next(error);
  }
}

export async function getAllReferrals(req: Request, res: Response, next: NextFunction) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const { paginatedData, nextPage } = await ReferralService.fetchPaginatedData(page, limit);
        
        res.status(200).send({
          data: paginatedData,
          pageNumber: nextPage
        });
    } catch (error) {
        next(error);
  }
}

export async function getReferral(req: Request, res: Response, next: NextFunction) {
    try {
        const referral = await ReferralRepository.findById(req.params.id);
        if (!referral) {
            return res.status(404).send({ message: 'Referral not found' });
        }
        res.status(200).send(referral);
    } catch (error) {
        next(error);
  }
}

export async function updateReferral(req: Request, res: Response, next: NextFunction) {
    try {
        const referral = await ReferralRepository.update(req.params.id, req.body);
        if (!referral) {
            return res.status(404).send({ message: 'Referral not found' });
        }
        res.status(200).send(referral);
    } catch (error) {
        next(error);
  }
}

export async function deleteReferral(req: Request, res: Response, next: NextFunction) {
    try {
        const referral = await ReferralRepository.delete(req.params.id);
        if (!referral) {
            return res.status(404).send({ message: 'Referral not found' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
  }
}
export async function totalReferral(req: Request, res: Response, next: NextFunction) {
    
    try {
        let param = {};
        if (req.query.group_id) param = {...param, group: req.query.group_id}
        if (req.query.sender_id) param = {...param, sender: req.query.sender_id}
        if (req.query.receiver_id) param = {...param, receiver: req.query.receiver_id}
        const total = await ReferralRepository.count(param);
        const closed = await ReferralRepository.count({...param, status: { $in: ["Declined", "Completed"] } });
        const unclosed = await ReferralRepository.count({...param, status: { $in: ["Accepted", "Pending"] } });
        const generated = await ReferralRepository.sum("price", param, {payStatus: true});
        const result = {
            totReferral: total.toString(),
            totClosedReferral: closed.toString(),
            totUnclosedReferral: unclosed.toString(),
            totgenerated: generated.toString(),
        };
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}


export async function getAllByUser(req: Request, res: Response, next: NextFunction) {
    try {
        const user_id = req.query.user_id as string;
        if (!user_id) {
            res.status(500).send({ message: `user_is is missing`});
        }
        const referrals = await ReferralRepository.findByUser(user_id);
        res.status(200).send(referrals);
    } catch (error) {
        next(error);
    }
}

export async function recentReferralTotal(req: Request, res: Response, next: NextFunction) {
    try {
        
        const months = getRecentMonths(5);
        const counts: number[] = [];
        for (var i in months) {
            const {startDate, endDate} = getStartAndEndDateFromMonthStr(months[i]);
            const cnt = await ReferralRepository.count({
                createdAt: {
                    $gte: startDate,
                    $lt: endDate
                }
            });
            counts.push(cnt);
        }
        res.status(200).send({months: months, counts: counts});
    } catch (error) {
        next(error);
    }
}

export async function totalReferralByGroup(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await ReferralRepository.sumPriceByGroup();
        let result = [];
        for (let i in data) {
            const groupId = data[i]?._id?.group?.toString();
            const group = await GroupRepository.findById(groupId);
            result.push({totalPrice: data[i]?.totalPrice, group: group?group.name: ""});            
        }
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}

export async function totalReferralByUser(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await ReferralRepository.sumPriceBySenderAndGroup();
        let result = [];
        for (let i in data) {
            const groupId = data[i]?._id?.group?.toString();
            const userId = data[i]?._id?.sender?.toString();
            const group = await GroupRepository.findById(groupId);
            const sender = await UserRepository.findById(userId);
            result.push({totalPrice: data[i]?.totalPrice, group: group?group.name: "", user: sender?sender.name: ""});    
        }
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}