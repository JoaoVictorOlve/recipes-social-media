import { User } from './user';

export interface Recipe {
  id?: number;
  title: string;
  ingredients: string;
  instructions: string;
  image: string;
  status?: 'active' | 'deleted';
  user_id?: number;
  User?: User; // Assuming you have a User model as well
}
