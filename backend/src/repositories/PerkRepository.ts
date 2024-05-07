import { Perk } from '../models';
import { IPerk } from '../types/perk';

class PerkRepository {
    async create(perkData: IPerk): Promise<IPerk> {
        const perk = new Perk(perkData);
        console.log(perk);
        return perk.save();
    }

    async findAll(): Promise<IPerk[]> {
        return Perk.find();
    }
    async findByUserId(userId: string): Promise<IPerk[]> {
        return Perk.find({user_id: userId});
    }

    async findById(id: string): Promise<IPerk | null> {
        return Perk.findById(id);
    }

    async update(id: string, perkData: Partial<IPerk>): Promise<IPerk | null> {      
        const updatedPerkData = { ...perkData };
        delete updatedPerkData._id;
        return Perk.findByIdAndUpdate(id, updatedPerkData, { new: true });
      }

    async delete(id: string): Promise<IPerk | null> {
      const result = await Perk.findByIdAndDelete(id);
      if (!result) {
          return null;
      }
      return result as unknown as IPerk;
    }
}

export default new PerkRepository();
