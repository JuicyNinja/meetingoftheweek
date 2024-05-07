import mongoose from 'mongoose';
import { IPerk } from '../types/perk';

const perkSchema = new mongoose.Schema({   
  name: String,
  user_id:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  price: Number,
  desc: String,
  terms: String
}, { timestamps: true });

const Perk = mongoose.model<IPerk>('Perk', perkSchema);

export default Perk;
