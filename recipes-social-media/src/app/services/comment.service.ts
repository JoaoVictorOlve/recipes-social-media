import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeComment } from '../shared/models/recipe-comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly apiUrl = 'http://localhost:3000/api/comment';

  constructor(private http: HttpClient) {}

  createComment(comment: RecipeComment): Observable<RecipeComment>{
    return this.http.post<RecipeComment>(`${this.apiUrl}`, comment);
  }

  deleteComment(id:number):Observable<RecipeComment>{
    return this.http.delete<RecipeComment>(`${this.apiUrl}/${id}`)
  }
}
