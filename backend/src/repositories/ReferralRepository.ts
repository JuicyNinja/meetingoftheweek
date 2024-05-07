
import mongoose from 'mongoose';
import Referral from '../models/Referral';
import { IPriceSumByGroup, IPriceSumBySenderAndGroup, IReferral } from '../types/referral';

class ReferralRepository {
    async create(referralData: IReferral): Promise<IReferral> {
        const referral = new Referral(referralData);
        return referral.save();
    }

    async findAll(): Promise<IReferral[]> {
        return Referral.find().populate('group').populate('sender').populate('receiver');
    }

    async findById(id: string): Promise<IReferral | null> {
        return Referral.findById(id);
    }

    async update(id: string, referralData: Partial<IReferral>): Promise<IReferral | null> {      
        const updatedReferralData = { ...referralData };
        delete updatedReferralData._id;
      
        return Referral.findByIdAndUpdate(id, updatedReferralData, { new: true });
      }

    async delete(id: string): Promise<IReferral | null> {
      const result = await Referral.findByIdAndDelete(id);
      if (!result) {
          return null;
      }
      return result as unknown as IReferral;
    }
    async count(filter?:any): Promise<number> {
        try {
            const totalCount = await Referral.countDocuments(filter);
            return totalCount;
        } catch (error) {
            console.error("Error getting total count of documents:", error);
            throw error; // Rethrow the error to handle it at a higher level
        }
    }

    async sum(field: string, ids: any, filter:any): Promise<number> {
        try {
            const result = await Referral.aggregate([
                {
                    $match: filter
                },
                {
                    $group: {
                        _id: ids,
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

    async findByUser(user_id: string): Promise<IReferral[] | null> {
        const query = {
            $or: [
                { sender: user_id },
                { receiver: user_id }
            ]
        };
        return Referral.find(query).populate('group').populate('sender').populate('receiver').lean();
    }

    async sumPriceBySenderAndGroup(): Promise<IPriceSumBySenderAndGroup[]> {
        try {
            const result = await Referral.aggregate<IPriceSumBySenderAndGroup>([
                {
                    $match: {payStatus: true}
                },
              {
                $group: {
                  _id: {
                    sender: '$sender',
                    group: '$group'
                  },
                  totalPrice: { $sum: '$price' }
                }
              },
              {
                $sort: { totalPrice: -1 }
              }
            ]);
            return result;
          } catch (error) {
            throw new Error('Error summing price by sender and group');
          }
    }

    async sumPriceByGroup(): Promise<IPriceSumByGroup[]> {
        try {
            const result = await Referral.aggregate<IPriceSumByGroup>([
              {  
                $match: {payStatus: true}
              },
              {
                $group: {
                  _id: {
                    group: '$group'
                  },
                  totalPrice: { $sum: '$price' }
                }
              },
              {
                $sort: { totalPrice: -1 }
              }
            ]);
            return result;
          } catch (error) {
            throw new Error('Error summing price by sender and group');
          }
    }

}

export default new ReferralRepository();
