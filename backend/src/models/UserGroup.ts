import mongoose, { Document } from "mongoose";
import { IUserGroup } from "../types/usergroup";
import Group from "./Group";


const userGroupSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  seat: {
    type: String,
    default: "Owner"
  },
  clanStatus: {  
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const UserGroup = mongoose.model<IUserGroup>('UserGroup', userGroupSchema);
export default UserGroup;
