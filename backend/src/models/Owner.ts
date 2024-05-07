import mongoose from 'mongoose';
import { IOwner } from '../types/owner';

const ownerSchema = new mongoose.Schema({
  name: String,
  clan: String,
  rank: String,
  clanStatus: Boolean,
  profileStatus: Boolean,
}, { timestamps: true });

const Owner = mongoose.model<IOwner>('Owner', ownerSchema);

export default Owner;
