import { NextFunction, Request, Response } from 'express';
import { GroupRepository, MeetingRepository, UserGroupRepository, UserRepository } from '../repositories';
import { GroupService } from '../service';
import { getRecentMonths, getStartAndEndDateFromMonthStr } from '../utils/utils';

export async function createGroup(req: Request, res: Response, next: NextFunction) {
    try {
        // Create a new group
        const group = await GroupRepository.create(req.body);

        // Associate the group with the user
        const userId = req.body.user_id;
        if (!userId || !group?._id) {
            throw new Error('User ID or Group ID is missing');
        }

        await UserGroupRepository.create({ group_id: group._id.toString(), user_id: userId });

        // Send response
        res.status(201).json(group);
    } catch (error) {
        // Pass the error to the error handling middleware
        next(error);
    }
}

export async function getAllGroups(req: Request, res: Response, next: NextFunction) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const { paginatedData, nextPage } = await GroupService.fetchPaginatedData(page, limit);
        
        res.status(200).send({
            data: paginatedData,
            pageNumber: nextPage
        });
    } catch (error) {
        next(error);
    }
}

export async function getGroup(req: Request, res: Response, next: NextFunction) {
    try {
        let group = await GroupRepository.findById(req.params.id);
        if (!group) {
            return res.status(404).send({ message: 'Group not found' });
        }

        const counterMember = await UserGroupRepository.count({ group_id: req.params.id, user_id: { $ne: null }});
        const groupSize = await UserGroupRepository.count({ group_id: req.params.id});

        const owner = await UserRepository.findById(group.owner);
        const meeting = await MeetingRepository.findRecent({group: group._id})
        res.status(200).send({...group, ownerInfo: owner, meetingInfo: meeting, counterMember, groupSize});
    } catch (error) {
        next(error);
    }
}

export async function updateGroup(req: Request, res: Response, next: NextFunction) {
    try {
        const group = await GroupRepository.update(req.params.id, req.body);
        if (!group) {
            return res.status(404).send({ message: 'Group not found' });
        }
        res.status(200).send(group);
    } catch (error) {
        next(error);
    }
}

export async function deleteGroup(req: Request, res: Response, next: NextFunction) {
    try {
        const group = await GroupRepository.delete(req.params.id);
        await UserGroupRepository.deleteByGroup(req.params.id);
        if (!group) {
            return res.status(404).send({ message: 'Group not found' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

export async function addUserToGroup(req: Request, res: Response, next: NextFunction) {
    try {
        let { userId, groupId } = req.body;
        // Check if the user and group exist
        if (userId === "") {
            userId = req.body.user_id;
        }
        const userExists = await UserRepository.findById(userId);
        const groupExists = await GroupRepository.findById(groupId);

        if (!userExists || !groupExists) {
            return res.status(404).json({ message: 'User or Group not found' });
        }

        // Create user-group association
        const dupCheck = await UserGroupRepository.findByUserAndGroup(userId, groupId);
        if (dupCheck) {
            return res.status(400).json({ message: 'User already joined to group' });
        }
        console.log(dupCheck);
        const group = await GroupRepository.increase(groupId, "counterMember", 1);
        const userGroup = await UserGroupRepository.create({ group_id:groupId, user_id: userId });
        res.status(201).json(userGroup);
    } catch (error) {
        next(error);
    }
}

export async function removeUserFromGroup(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId, groupId } = req.body;

        // Remove user-group association
        await UserGroupRepository.deleteByUserAndGroup(userId, groupId);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}


export async function totalGroup(req: Request, res: Response, next: NextFunction) {
    
    try {
        const total = await GroupRepository.count();
        const member = await UserGroupRepository.count({user_id: { $ne: null }});
        const result = {
            totGroupNum: total.toString(),
            totMemberNum: member.toString()
        };
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}

export async function getGroupMembers(req: Request, res: Response, next: NextFunction) {
    try {
        const cate = req.query.cate as string
        const filter = cate === 'ALL' ? {} : cate === 'MEMBER' ? {user_id: { $ne: null }} : {user_id : null};
        const members = await UserGroupRepository.findByGroup(req.params.id, filter);
        res.status(200).send(members);
    } catch (error) {
        next(error);
    }
}

export async function recentGroupTotal(req: Request, res: Response, next: NextFunction) {
    
    try {
        
        const months = getRecentMonths(5);
        const counts: number[] = [];
        for (var i in months) {
            const {startDate, endDate} = getStartAndEndDateFromMonthStr(months[i]);
            const cnt = await GroupRepository.count({
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


export async function createMember(req: Request, res: Response, next: NextFunction) {
    try {
        // Create a new member
        const member = await UserGroupRepository.create(req.body);
        // Send response
        res.status(201).json(member);
    } catch (error) {
        // Pass the error to the error handling middleware
        next(error);
    }
}


export async function getMember(req: Request, res: Response, next: NextFunction) {
    try {
        let member = await UserGroupRepository.findById(req.params.id);
        if (!member) {
            return res.status(404).send({ message: 'Member not found' });
        }
        res.status(200).send(member);
    } catch (error) {
        next(error);
    }
}

export async function updateMember(req: Request, res: Response, next: NextFunction) {
    try {
        const member = await UserGroupRepository.update(req.params.id, req.body);
        if (!member) {
            return res.status(404).send({ message: 'Member not found' });
        }
        res.status(200).send(member);
    } catch (error) {
        next(error);
    }
}

export async function deleteMember(req: Request, res: Response, next: NextFunction) {
    try {
        const member = await UserGroupRepository.delete(req.params.id);
        if (!member) {
            return res.status(404).send({ message: 'Seat not found' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}