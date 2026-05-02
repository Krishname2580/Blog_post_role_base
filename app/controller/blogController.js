const Blog = require('../models/blog')

class BlogController {

    

    async createBlog(req, res) {
        try {

            const { title, content } = req.body;
            if (!title || !content) {
                return res.status(400).json({
                    status: false,
                    message: 'All fields are required'
                })
            }
            const blog = await Blog.create({
                title,
                content,
                authName: req.author.name,
                isPublish: false,
            });
            return res.status(200).json({
                status: true,
                message: 'Blog Created Successfully',
                data: blog,
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message,
            });
        }
    }


    async getSubmittedBlogs(req, res) {
        try {

            const blogs = await Blog.find({ isPublish: false });
            return res.status(200).json({
                status: true,
                message: 'Blog fetch successfully',
                data: blogs
            })

        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.message
            })
        }
    }

    async publishBlog(req, res) {

        try {
            const id = req.params.id;
            const blog = await Blog.findById(id)

            if (!blog) {
                return res.status(400).json({
                    status: false,
                    message: 'Blog not fond'
                })
            }
            if (blog.isPublish) {
                return res.status(400).json({
                    status: false,
                    message: 'Blog is already publish'
                })
            }

            blog.isPublish = true;
            await blog.save();
            return res.status(200).json({
                status: true,
                message: "Blog published successfully",
                data: blog,
            });

        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.message
            })
        }
    }

    async getPublishBlog(req, res) {

        try {
            if (req.user.role !== 'user') {
                return res.status(400).json({
                    status: false,
                    message: "Only user can view",
                });
            }

            const blogs = await Blog.find({ isPublish: true })

            return res.status(201).json({
                status: true,
                message: 'Blog fetch successfully',
                data: blogs
            });

        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.message
            })
        }
    }

    async getBlogById(req,res){
        try{
            if(req.user.role !== 'user'){
                return res.staus(400).json({
                    status: false,
                    message: 'Only user can view the publish blogs'
                })
            }

            const id = req.params.id;
            const blog = await Blog.findOne({_id: id, isPublish: true })
            if(!blog){
                return res.status(400).json({
                    status: false,
                    message: 'Blog not found'
                })
            }
            return res.status(200).json({
                status: true,
                message: 'Publish Blog fetch successfully',
                data: blog
            })

        } catch(error){
            return res.status(400).json({
                status: false,
                message: error.message
            })
        }
    }


}
module.exports = new BlogController();