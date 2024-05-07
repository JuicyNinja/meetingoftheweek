import { group } from "console";
import { Group, Owner } from "../models";
import { IGroup } from "../types/group";


class GroupRepository {
    async create(groupData: IGroup): Promise<Partial<IGroup>> {
        try {
            const group =await Group.create({...groupData});
            const id =(await Group.findOne({name:groupData.name}))?._id;
           // Log savedGroup instead of group
            return {...group,...(id&&{_id:id})};
        } catch (error) {
            console.error("Error saving group:", error);
            throw error; // Rethrow the error to handle it at a higher level
        }
    }

    async findAll() {
        return Group.find().populate('meetings').lean();
    }

    async findById(id:string) {
        return Group.findById(id).populate('meetings').lean();
    }

    async update(id:string, groupData:any) {      
        const updatedGroupData = { ...groupData };
        delete updatedGroupData._id;
      
        return Group.findByIdAndUpdate(id, updatedGroupData, { new: true });
    }

    async delete(id:string) {
        return Group.findByIdAndDelete(id);
    }

    async increase(id:string, fieldName: string, inc: number) {
        return Group.findByIdAndUpdate(id, { $inc: { [fieldName]: inc } }, { new: true });
    }

    async count(filter?:any): Promise<number> {
        try {
            const totalCount = await Group.countDocuments(filter);
            return totalCount;
        } catch (error) {
            console.error("Error getting total count of documents:", error);
            throw error; // Rethrow the error to handle it at a higher level
        }
    }

    async sum(field: string): Promise<number> {
        try {
            const result = await Group.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: `$${field}` }
                    }
                }
            ]);

            if (result.length > 0) {
                return result[0].total;
            } else {
                return 0;
            }
        } catch (error) {
            console.error(`Error summing up column ${field}:`, error);
            throw error;
        }
    }
}

export default new GroupRepository();
