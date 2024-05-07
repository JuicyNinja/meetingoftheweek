import mongoose from 'mongoose';
import { IGroup } from '../types/group';

const groupSchema = new mongoose.Schema({   
  name: String,
  location: String,
  owner:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  profileStatus: Boolean,
  counterMember: Number,
  groupSize: Number,
  logo: String,
  message: String,
  meetings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meeting'
  }]
}, { timestamps: true });

const Group = mongoose.model<IGroup>('Group', groupSchema);

export default Group;
