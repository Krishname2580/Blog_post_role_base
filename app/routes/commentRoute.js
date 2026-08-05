const express = require("express");
const router = express.Router();

const commentController = require("../controller/commentController");

const AuthCheck = require("../middleware/AuthCheck");

// Add Comment
router.post("/create/comment", AuthCheck, commentController.createComment);

// Get Comments By Blog
router.get("/blog/comments/:blogId", AuthCheck, commentController.getCommentsByBlog);

// Update Comment
router.put("/comment/update/:id", AuthCheck, commentController.updateComment);

// Delete Comment
router.delete("/comment/delete/:id", AuthCheck, commentController.deleteComment);

module.exports = router;