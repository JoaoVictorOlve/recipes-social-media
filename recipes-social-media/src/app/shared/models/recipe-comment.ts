import { User } from "./user";

export interface RecipeComment {
  id?: number;
  rate: number; // Add a question mark if it's an optional field
  comment: string; // Add a question mark if it's an optional field
  status?: 'active' | 'deleted'; // Define the status field with enum values
  user_id: number; // Assuming you have a user_id foreign key
  User?: User; // Define the relationship with Comment
  recipe_id: number
}
