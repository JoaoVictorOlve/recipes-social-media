const express = require('express');
const router = express.Router();
const recipeController = require('../controller/recipeController');


router.get('/', recipeController.getAllRecipes);

router.get('/:id', recipeController.getRecipeById);

router.get('/:recipe_id/comments', recipeController.getRecipeComments);

router.post('/', recipeController.createRecipe);

// PUT update a flavor by ID
router.patch('/:id', recipeController.updateRecipe);

// DELETE a flavor by ID
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
