import { Timestamp } from 'firebase/firestore';

export interface IPayment {
  id: string;
  status: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
