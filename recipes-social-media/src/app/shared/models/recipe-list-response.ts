import { Recipe } from './recipe';

export interface RecipeListResponse {
  nextUrl: string | null;
  previousUrl: string | null;
  limit: number;
  offset: number;
  total: number;
  results: Recipe[];
}
