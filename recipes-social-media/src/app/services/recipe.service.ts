import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../shared/models/recipe';
import { RecipeListResponse } from '../shared/models/recipe-list-response';
import { RecipeComment } from '../shared/models/recipe-comment';
import { RecipeUpload } from '../shared/models/recipe-upload';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private readonly apiUrl = 'http://localhost:3000/api/recipe';

  constructor(private http: HttpClient) {}

  getRecipesList(limit: number, offset: number): Observable<RecipeListResponse> {
    const params = { limit: limit.toString(), offset: offset.toString() };
    return this.http.get<RecipeListResponse>(`${this.apiUrl}`, { params });
  }

  getRecipeById(id : number): Observable<Recipe>{
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`)
  }

  createRecipe(recipe: Recipe): Observable<any>{
    return this.http.post(`${this.apiUrl}`, recipe);
  }

  updateRecipe(id: number, recipe:Recipe): Observable<Recipe>{
    return this.http.patch<Recipe>(`${this.apiUrl}/${id}`, recipe)
  }

  deleteRecipe(id:number):Observable<Recipe>{
    return this.http.delete<Recipe>(`${this.apiUrl}/${id}`)
  }

  getRecipeComments(id: number): Observable<RecipeComment[]>{
    return this.http.get<RecipeComment[]>(`${this.apiUrl}/${id}/comments`)
  }
}
