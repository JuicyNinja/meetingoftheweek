import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
  meetingname: String,
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner'
  },
  meetingtime: String,
  meetinglink: String,
  meetingStatus: Boolean
}, { timestamps: true });

const Meeting = mongoose.model('Meeting', meetingSchema);

export default Meeting;
