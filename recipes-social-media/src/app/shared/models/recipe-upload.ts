import { User } from './user';

export interface RecipeUpload {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
  image?: File;
  status: 'active' | 'deleted';
  user_id: number;
  User: User; // Assuming you have a User model as well
}
