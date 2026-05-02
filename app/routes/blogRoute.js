const express = require('express')
const BlogController = require('../controller/blogController')
const UserAuthCheck = require('../middleware/userAuthCheck')
const AuthorAuthCheck = require('../middleware/authorAuthCheck')
const AdminAuthCheck = require('../middleware/adminAuthCheck')

const router = express.Router();

router.post('/author/create', AuthorAuthCheck, BlogController.createBlog)

router.get('/admin/submit', AdminAuthCheck, BlogController.getSubmittedBlogs)
router.patch('/admin/publish/:id', AdminAuthCheck, BlogController.publishBlog)

router.get('/blog', UserAuthCheck, BlogController.getPublishBlog)
router.get('/blog/:id', UserAuthCheck, BlogController.getBlogById)

module.exports=router;