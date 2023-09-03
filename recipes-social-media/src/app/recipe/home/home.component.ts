import { RecipeService } from './../../services/recipe.service';
import { Component } from '@angular/core';
import { Recipe } from 'src/app/shared/models/recipe';
import { RecipeListResponse } from 'src/app/shared/models/recipe-list-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  pageIsEmpty: boolean = false;
  errorLoadingPage: boolean = false;
  recipes: Recipe[] = [];
  nextPageUrl: string | null = null;
  previousPageUrl: string | null = null;

  constructor(private recipeService : RecipeService){
  }

  ngOnInit():void{
    this.loadRecipes();
  }

  loadRecipes():void{
    this.recipeService.getRecipesList(8, 0).subscribe(
      (response: RecipeListResponse)=>{
        this.recipes = response.results;
        this.nextPageUrl = response.nextUrl;
        this.previousPageUrl = response.previousUrl;
        if(!(this.recipes.length > 0)){
          this.pageIsEmpty = true;
        }
      },
      error => this.errorLoadingPage = true
    );
  }

  loadNextPage():void{
    if(this.nextPageUrl){
      const params = new URLSearchParams(this.nextPageUrl.split('?')[1]);
      const limit = +params.get('limit')!;
      const offset = +params.get('offset')!;
      this.recipeService.getRecipesList(limit, offset).subscribe(
        (response: RecipeListResponse)=>{
          this.recipes = response.results.concat(this.recipes);
          this.nextPageUrl = response.nextUrl;
          this.previousPageUrl = response.previousUrl;
        },
        error => console.log(error)
      );
    }
  }
}
