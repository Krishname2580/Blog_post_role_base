const Like = require("../models/like");
const Blog = require("../models/blog");

class LikeController {

    // Like Blog
    async likeBlog(req, res) {
        try {

            const { blogId } = req.body;

            if (!blogId) {
                return res.status(400).json({
                    status: false,
                    message: "Blog Id is required"
                });
            }

            const blog = await Blog.findById(blogId);

            if (!blog) {
                return res.status(404).json({
                    status: false,
                    message: "Blog not found"
                });
            }

            const alreadyLiked = await Like.findOne({
                blogId,
                userId: req.user._id
            });

            if (alreadyLiked) {
                return res.status(400).json({
                    status: false,
                    message: "Blog already liked"
                });
            }

            const like = await Like.create({
                blogId,
                userId: req.user._id
            });

            return res.status(201).json({
                status: true,
                message: "Blog liked successfully",
                data: like
            });

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }

    // Unlike Blog
    async unlikeBlog(req, res) {
        try {

            const like = await Like.findOne({
                blogId: req.params.blogId,
                userId: req.user._id
            });

            if (!like) {
                return res.status(404).json({
                    status: false,
                    message: "Like not found"
                });
            }

            await Like.findByIdAndDelete(like._id);

            return res.status(200).json({
                status: true,
                message: "Like removed successfully"
            });

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }

    // Get Likes of Blog
    async getBlogLikes(req, res) {
        try {

            const likes = await Like.find({
                blogId: req.params.blogId
            }).populate("userId", "name email");

            return res.status(200).json({
                status: true,
                totalLikes: likes.length,
                data: likes
            });

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }

}

module.exports = new LikeController();