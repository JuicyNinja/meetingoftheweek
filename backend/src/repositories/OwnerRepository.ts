import { Owner } from '../models';
import { IOwner } from '../types/owner';

class OwnerRepository {
    async create(ownerData: IOwner): Promise<IOwner> {
        const owner = new Owner(ownerData);
        console.log(owner);
        return owner.save();
    }

    async findAll(): Promise<IOwner[]> {
        return Owner.find();
    }

    async findById(id: string): Promise<IOwner | null> {
        return Owner.findById(id);
    }

    async update(id: string, ownerData: Partial<IOwner>): Promise<IOwner | null> {      
        const updatedOwnerData = { ...ownerData };
        delete updatedOwnerData._id;
      
        return Owner.findByIdAndUpdate(id, updatedOwnerData, { new: true });
      }

    async delete(id: string): Promise<IOwner | null> {
      const result = await Owner.findByIdAndDelete(id);
      if (!result) {
          return null;
      }
      return result as unknown as IOwner;
    }
}

export default new OwnerRepository();
