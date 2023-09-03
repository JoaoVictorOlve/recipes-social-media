const Comment = require('../models/comment');
const Recipe = require('../models/recipe');
const { Op } = require('sequelize');

// GET all comments
async function getAllComments(req, res) {
  try {
    const comments = await Comment.findAll({
        where: {
            status: {
                [Op.ne]: 'deleted'
            }
        }
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

// GET a single comment by ID
async function getCommentById(req, res) {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id);
    if (comment && comment.status !== 'deleted') {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ error: 'Comentário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

// POST create a new comment
async function createComment(req, res) {
  const { recipe_id, user_id, comment } = req.body;
  if(!recipe_id || !user_id || !comment ||
    typeof(recipe_id) !== 'number' || typeof(user_id) !== 'number' ||
    typeof(comment) !== 'string'){
   return res.status(400).json({ error: 'Campo inválido' });
 }
  try {
    const newComment = await Comment.create({ recipe_id, user_id, comment });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

// PUT update a comment by ID
async function updateComment(req, res) {
  const { id } = req.params;
  const { recipe_id, user_id, comment } = req.body;

  if(!recipe_id || !user_id || !comment ||
    typeof(recipe_id) !== 'number' || typeof(user_id) !== 'number' ||
    typeof(comment) !== 'string'){
   return res.status(400).json({ error: 'Campo inválido' });
 }
  try {
    const editedComment = await Comment.findByPk(id);
    if (comment && comment.status !== 'deleted') {
      editedComment.recipe_id = recipe_id;
      editedComment.user_id = user_id;
      editedComment.comment = comment;
      await editedComment.save();
      res.json({message: 'Comentário atualizado com sucesso!'});
    } else {
      res.status(404).json({ error: 'Comentário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

// DELETE a comment by ID
async function deleteComment(req, res) {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id);
    if (comment) {
        comment.status = 'deleted';
      await comment.save();
      res.json({ message: 'Comentário excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Comentário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
