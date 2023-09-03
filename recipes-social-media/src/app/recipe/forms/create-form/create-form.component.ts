import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/shared/models/recipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent {
  @Input() recipe: Recipe | undefined;
  recipeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
      user_id: [0, Validators.required]
    });
  }

  inputFileChange(event : any){
    if(event.target.files && event.target.files[0]){
      const image = event.target.files[0];

      this.recipeForm.value.image = image;
    }
  }

  onSubmit(): void {
    const formData = this.recipeForm.value;

    if(formData.name > 50){
      Swal.fire("", "Nome muito longo!", "error")
    } else {

      const user = JSON.parse(localStorage.getItem("userData") || '{}');
      formData.user_id = Number(user!.id);

      console.log(formData)

      this.recipeService.createRecipe(formData).subscribe(
        (res)=>{
          Swal.fire("", "Receita criada!", "success")
          this.router.navigate([`/detail/${res.id}`])
        }, (err)=>{
          Swal.fire("", "Algo de errado aconteceu.", "error")
        }
      );
    }
  }
}
