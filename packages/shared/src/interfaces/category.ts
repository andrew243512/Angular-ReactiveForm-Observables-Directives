import { CategoryTypes } from '../enums/category-types.enum';
import { Timestamp } from 'firebase/firestore';

export interface ICategory {
  id: string;
  name: string;
  type: CategoryTypes;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
