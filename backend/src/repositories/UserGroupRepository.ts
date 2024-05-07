import { Group, UserGroup } from "../models";
import { IUserGroup } from "../types/usergroup";

class UserGroupRepository {
    async create(usergroupData: Partial<IUserGroup>) {
        const usergroup = new UserGroup(usergroupData);
        return usergroup.save();
    }

    async findAll() {
        return UserGroup.find();
    }

    async findById(id:string) {
        return UserGroup.findById(id).populate('user_id').populate('group_id').lean();
    }

    async update(id:string, usergroupData:any) {
        const updatedUserGroupData = { ...usergroupData };
        delete updatedUserGroupData._id;
        return UserGroup.findByIdAndUpdate(id, updatedUserGroupData, { new: true });
    }

    async delete(id:string) {
        return UserGroup.findByIdAndDelete(id);
    }

    async deleteByUserAndGroup(userId:string, groupId:string) {
        return UserGroup.deleteOne({ user_id: userId, group_id: groupId });
    }

    async findByUserAndGroup(userId:string, groupId:string) {
        return UserGroup.findOne({ user_id: userId, group_id: groupId }).lean();
    }
    async findByUser(userId:string) {
        return UserGroup.find({ user_id: userId}).populate('user_id').populate('group_id').lean();
    }
    async findByGroup(groupId:string, filter: any = {}) {
        return UserGroup.find({...filter, group_id: groupId }).populate('user_id').populate('group_id').lean();
    }
    async findOneByUser(userId:string | null) {
        return UserGroup.findOne({ user_id: userId}).sort({ updatedAt: -1 }).lean();
    }
    async findOneWithGroupByUser(userId:string | null) {
        return UserGroup.findOne({ user_id: userId}).populate('group_id').sort({ updatedAt: -1 }).lean();
    }

    async deleteByUser(userId:string | null) {
        return UserGroup.deleteMany({ user_id: userId});
    }
    async deleteByGroup(groupId:string | null) {
        return UserGroup.deleteMany({ group_id: groupId});
    }


    async count(filter?:any): Promise<number> {
        try {
            const totalCount = await UserGroup.countDocuments(filter).lean();
            return totalCount;
        } catch (error) {
            console.error("Error getting total count of documents:", error);
            throw error; // Rethrow the error to handle it at a higher level
        }
    }
}

export default new UserGroupRepository();
