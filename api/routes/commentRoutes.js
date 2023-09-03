const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentController');

// GET all flavors
router.get('/', commentController.getAllComments);

// GET a single flavor by ID
router.get('/:id', commentController.getCommentById);

// POST create a new flavor
router.post('/', commentController.createComment);

// PUT update a flavor by ID
router.patch('/:id', commentController.updateComment);

// DELETE a flavor by ID
router.delete('/:id', commentController.deleteComment);

module.exports = router;
