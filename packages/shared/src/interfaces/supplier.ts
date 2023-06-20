import { Timestamp } from 'firebase/firestore';

export interface ISupplier {
  address: string;
  zipCode: string;
  city: string;
  country: string;
  email: string;
  id: string;
  name: string;
  phone: string;
  website?: string;
  notes?: string;
  status: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
