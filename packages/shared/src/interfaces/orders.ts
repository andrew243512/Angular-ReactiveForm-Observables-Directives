import { OrdersStatus } from '../enums/orders-status.enum';
import { Timestamp } from 'firebase/firestore';

export interface IOrders {
  id: string;
  customerId: string;
  status: OrdersStatus;
  paymentStatus: boolean;
  paymentId: string;
  date: Timestamp;
  shipDate: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
