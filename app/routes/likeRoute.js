const express = require("express");
const router = express.Router();

const likeController = require("../controller/likeController");
const AuthCheck = require("../middleware/AuthCheck");

// Like Blog
router.post("/create/like", AuthCheck, likeController.likeBlog);

router.delete("/delete/like/:blogId", AuthCheck, likeController.unlikeBlog);

router.get("/blog/likes/:blogId", AuthCheck, likeController.getBlogLikes);

module.exports = router;