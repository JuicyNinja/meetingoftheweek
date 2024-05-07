export interface IOwner extends Document {
    _id: string | null;
    name: string;
    clan: string;
    rank: string;
    clanStatus: boolean;
    profileStatus: boolean;
}
  