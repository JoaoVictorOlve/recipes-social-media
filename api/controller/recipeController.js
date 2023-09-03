const Recipe = require('../models/recipe');
const Comment = require('../models/comment');
const { Op } = require('sequelize');
const User = require('../models/user');

const multer = require('multer');
const path = require('path');

const countRecipes = async () => {
  const count = await Recipe.count({
    where: {
      status: {
        [Op.ne]: 'deleted'
      }
    }
  });
  return count;
};

// GET all recipes
async function getAllRecipes(req, res) {
  try {
    let {limit, offset} = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if(!limit){
      limit = 8;
    }
    if(!offset){
      offset = 0;
    }

    console.log(limit, offset);
    const recipesResult = await Recipe.findAndCountAll({
      include: User,
      where: {
        status: {
          [Op.ne]: 'deleted'
        }
      },
      order: [['id', 'DESC']], // Sorting order, use your desired field here
      limit: limit,
      offset: offset
    });

    const next = offset + limit;
    const total = await countRecipes()
    const currentUrl = req.baseUrl;
    console.log(currentUrl)

    const nextUrl = next < total ? `${currentUrl}+?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl = previous != null ? `${currentUrl}+?limit=${limit}&offset=${previous}` : null;

    const recipes = recipesResult.rows;

        res.send({
          nextUrl,
          previousUrl,
          limit,
          offset,
          total,
          results: recipes.map(recipeItem => ({
            id: recipeItem.id,
            title: recipeItem.title,
            ingredients: recipeItem.ingredients,
            instructions: recipeItem.instructions,
            image: recipeItem.image,
            status: recipeItem.status,
            user_id: recipeItem.user_id,
            User: recipeItem.User
          }))
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

// GET a single recipe by ID
async function getRecipeById(req, res) {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findByPk(id, {include: User});
    if (recipe && recipe.status !== 'deleted') {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ error: 'Receita não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

// POST create a new recipe
async function createRecipe(req, res) {
  let { user_id, title, ingredients, instructions, image } = req.body;

  if(!user_id || !title || !ingredients || !instructions ||
    typeof(user_id) !== 'number' || typeof(title) !== 'string' ||
    typeof(ingredients) !== 'string' || typeof(instructions) !== 'string'){
   return res.status(400).json({ error: 'Campo inválido' });
 }
  try {
    const newRecipe = await Recipe.create({ user_id, title, ingredients, instructions, image });
    res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

// PUT update a recipe by ID
async function updateRecipe(req, res) {
  const { id } = req.params;
  const { title, ingredients, instructions, image } = req.body;

  if(!title || !ingredients || !instructions || !image ||
    typeof(title) !== 'string' || typeof(ingredients) !== 'string' ||
    typeof(instructions) !== 'string' || typeof(image) !== 'string'){
   return res.status(400).json({ error: 'Campo inválido' });
 }
  try {
    const recipe = await Recipe.findByPk(id);
    if (recipe && recipe.status !== 'deleted') {
      recipe.title = title;
      recipe.ingredients = ingredients;
      recipe.instructions = instructions;
      recipe.image = image;

      await recipe.save();
      res.json({message: 'Receita atualizada com sucesso!'});
    } else {
      res.status(404).json({ error: 'Receita não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

// DELETE a recipe by ID
async function deleteRecipe(req, res) {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findByPk(id);
    if (recipe) {
        recipe.status = 'deleted';
      await recipe.save();
      res.json({ message: 'Receita excluída com sucesso' });
    } else {
      res.status(404).json({ error: 'Receita não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

// Get all comments from recipe

async function getRecipeComments(req, res) {
    const { recipe_id } = req.params;
  
    try {
      const recipe = await Recipe.findByPk(recipe_id, {
        include: {
            model: Comment,
            include: User,
            where: {
                status: {
                    [Op.ne]: 'deleted'
                }
            }
        },
        where: {
            status: {
                [Op.ne]: 'deleted'
            }
        }
      });
  
      if (!recipe) {
        return res.status(404).json({ error: 'Receita não encontrada' });
      }
  
      res.json(recipe.Comments);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
}; 

module.exports = {
  getAllRecipes,
  getRecipeById,
  getRecipeComments,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
