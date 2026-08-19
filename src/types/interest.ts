export type InterestStatus = 'Pending' | 'Approved' | 'Rejected';

export interface InterestRequest {
  itemId: string;
}

export interface InterestRecord {
  _id?: string;
  itemId: string;
  userId: string;
  status: InterestStatus;
}

export interface InterestResponse extends InterestRecord {}
