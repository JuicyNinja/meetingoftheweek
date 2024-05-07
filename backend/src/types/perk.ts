import mongoose, { Document } from "mongoose";

export interface IPerk extends Document {
    _id: mongoose.Types.ObjectId;
    user_id: string; // User ID
    price: Number;
    desc: string;
    terms: string;
}
  