import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/shared/models/recipe';
import { RecipeComment } from 'src/app/shared/models/recipe-comment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  @ViewChild('textareaElement') textareaElement: ElementRef | undefined;
  commentInput: string = '';
  commentRate: number = 5;
  recipe: Recipe | undefined;
  user_id: number = 0;
  comments: RecipeComment[] = [];

  text = ''; // Initial text content
  textareaHeight = 32; // Initial textarea height in pixels

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private cookieService: CookieService,
    private commentService: CommentService
  ) {}

  ngOnInit():void{
    const recipeId = Number(this.route.snapshot.paramMap.get('id'));
    if(recipeId){
      this.recipeService.getRecipeById(recipeId).subscribe(
        (recipe)=>(this.recipe = recipe),
        (error)=> this.router.navigate(['/'])
      )

      this.recipeService.getRecipeComments(recipeId).subscribe(
        (comment)=> (this.comments = comment),
        (error)=> this.comments = []
      )
    }
    else{
      this.router.navigate(['/']);
    }

    try{
      this.user_id = JSON.parse(localStorage.getItem("userData") || "").id;
    }
    catch(err){
      this.user_id = 0;
    }
  }

  newComment() {
    const token = this.cookieService.get("token");
    if (!token) {
      this.router.navigate(['/auth/login'])
    } else {

      const recipeId = Number(this.route.snapshot.paramMap.get('id'));
      let user = JSON.parse(localStorage.getItem("userData") || "")

      this.commentService.createComment({
        rate: this.commentRate,
        comment: this.commentInput,
        user_id: user.id,
        recipe_id: recipeId
      }).subscribe(()=>{
        this.commentInput = '';
        this.commentRate = 5;
        this.recipeService.getRecipeComments(recipeId).subscribe(
          (comment)=> (this.comments = comment),
          (error)=> this.comments = []
        )
      }, (err)=>{
        Swal.fire("", "Algo de errado aconteceu.", "error")
      })


  }

}

deleteComment(comment_id: number){
  Swal.fire({
    title: 'Deseja excluir seu comentário?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Excluir',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      const recipeId = Number(this.route.snapshot.paramMap.get('id'));
      this.commentService.deleteComment(comment_id).subscribe(
        ()=>{
          this.recipeService.getRecipeComments(recipeId).subscribe(
            (comment)=> (this.comments = comment),
            (error)=> this.comments = []
          )
          Swal.fire(
            'Excluído!',
            'Seu comentário foi excluído.',
            'success'
          )
        }, (err)=>{
          Swal.fire("", "Algo de errado aconteceu.", "error")
        }
      )
    }
  })
}

deleteRecipe():void{
    Swal.fire({
    title: 'Deseja excluir sua receita?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Excluir',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      const recipeId = Number(this.route.snapshot.paramMap.get('id'));
      this.recipeService.deleteRecipe(recipeId).subscribe(
        ()=>{
          this.router.navigate(['/']);
          Swal.fire(
          'Excluído!',
          'Sua receita foi excluída.',
          'success'
          )
        }, (err)=>{
          Swal.fire("", "Algo de errado aconteceu.", "error")
        }
      )
    }
  })

}

}
