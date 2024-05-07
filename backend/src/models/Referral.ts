import mongoose from 'mongoose';
import { IReferral } from '../types/referral';

const referralSchema = new mongoose.Schema({
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: String,
  desc: String,
  price: Number,
  payStatus: Boolean,
}, { timestamps: true });

const Referral = mongoose.model<IReferral>('Referral', referralSchema);

export default Referral;
