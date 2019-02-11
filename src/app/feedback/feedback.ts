export interface IFeedback {
  uid: string;
  msg: string;
  userName: string;
  userPhotoUrl?: string;
  key?: string;
  instructorKey?: string;  //  instructorKey to query for feedbacks related to a certain instructor
  instructorName: string;  //  instructorName to display name
  rating: number;
  ts: number;
}
