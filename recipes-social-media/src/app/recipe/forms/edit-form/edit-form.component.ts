import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  editRecipeForm: FormGroup;
  recipeId: number = 0;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.editRecipeForm = this.fb.group({
      title: ['', Validators.required],
      image: [''],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipeId = +params['id'];
      this.loadRecipeDetails();
    });
  }

  loadRecipeDetails() {
    // Use the RecipeService to fetch the current recipe details
    this.recipeService.getRecipeById(this.recipeId).subscribe(
      (recipe) => {
        this.editRecipeForm.patchValue({
          title: recipe.title,
          image: recipe.image,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          // Set other form control values here
        });
      },
      (error) => {
        // Handle error
      }
    );
  }

  onSubmit() {
    // Check if the form is valid
    if (this.editRecipeForm.valid) {
      // Create an object with the updated recipe details
      const updatedRecipe = {
        title: this.editRecipeForm.value.title,
        image: this.editRecipeForm.value.image,
        ingredients: this.editRecipeForm.value.ingredients,
        instructions: this.editRecipeForm.value.instructions,
        // Add other fields here
      };

      // Use the RecipeService to update the recipe
      this.recipeService.updateRecipe(this.recipeId, updatedRecipe).subscribe(
        () => {
          // Redirect to the recipe details page after successful update
          this.router.navigate([`/detail/${this.recipeId}`])
          Swal.fire(
            'Editado!',
            'Sua receita foi editada.',
            'success'
            )
        },
        (error) => {
          Swal.fire("", "Algo de errado aconteceu.", "error")
        }
      );
    }
  }
}
