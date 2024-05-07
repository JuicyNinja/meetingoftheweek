// types/usergroup.ts

import { Document } from 'mongoose';

export interface IUserGroup extends Document {
  _id: string | null,
  group_id: string | null; // Group ID
  user_id: string | null; // User ID
  seat: string;
  clanStatus: boolean;
}
