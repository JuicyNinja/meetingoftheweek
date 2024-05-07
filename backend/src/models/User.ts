import mongoose from 'mongoose';
import { IUser } from '../types/user';
import { Roles } from '../enums/role.enums';


const userSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isEmailVerified: {  
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
  },
  businessPhone: {
    type: String,
  },
  businessEmail: {
    type: String,
  },
  businessWebsite: {
    type: String,
  },
  googleLink: {
    type: String,
  },
  profilePhoto: {
    type: String,
  },
  businessLogo: {
    type: String,
  },
  roles: {
    type: [String],
    enum: Roles,
    required: true,
    default: Roles.DEFAULT,
  },
  isOwner: {
    type:Boolean,
    default: false
  },
  profileStatus: {  
    type: Boolean,
    default: false,
  },
  referrals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Referral'
  }]
}, { timestamps: true });

const User = mongoose.model<IUser>('User', userSchema);

export default User;
