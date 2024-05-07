import mongoose from "mongoose";

export interface IReferral extends Document {
    _id: string | null;
    group: string | null;
    sender: string;
    receiver: string;
    status: string;
    desc: string;
    price: number;
    paystatus: boolean;
}

export interface IPriceSumBySenderAndGroup extends Document {
    _id: {
        sender: mongoose.Types.ObjectId;
        group: mongoose.Types.ObjectId;
    };
    totalPrice: number;
}

export interface IPriceSumByGroup extends Document {
    _id: {
        group: mongoose.Types.ObjectId;
    };
    totalPrice: number;
}
