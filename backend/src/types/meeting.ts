export interface IMeeting extends Document {
    _id: string | null;
    meetingname: string;
    groupname: string;
    groupowner: string;
    meetingtime: string;
    meetinglink: string;
    meetingStatus: boolean;
    
}
  