const Comment = require("../models/Comment");
const Blog = require("../models/blog");

class CommentController {

    // Create Comment
    async createComment(req, res) {
        try {

            const { blogId, comment } = req.body;

            if (!blogId || !comment) {
                return res.status(400).json({
                    status: false,
                    message: "All fields are required"
                });
            }

            const blog = await Blog.findById(blogId);

            if (!blog) {
                return res.status(404).json({
                    status: false,
                    message: "Blog not found"
                });
            }

            const newComment = await Comment.create({
                blogId,
                userId: req.user._id,
                comment
            });

            return res.status(201).json({
                status: true,
                message: "Comment added successfully",
                data: newComment
            });

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }

    // Get Comments By Blog
    async getCommentsByBlog(req, res) {
        try {

            const comments = await Comment.find({
                blogId: req.params.blogId
            })
                .populate("userId", "name email")
                .sort({ createdAt: -1 });

            return res.status(200).json({
                status: true,
                total: comments.length,
                data: comments
            });

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }

    // Update Comment
    async updateComment(req, res) {
        try {

            const comment = await Comment.findById(req.params.id);

            if (!comment) {
                return res.status(404).json({
                    status: false,
                    message: "Comment not found"
                });
            }

            if (comment.userId.toString() !== req.user._id.toString()) {
                return res.status(403).json({
                    status: false,
                    message: "Unauthorized"
                });
            }

            comment.comment = req.body.comment || comment.comment;

            await comment.save();

            return res.status(200).json({
                status: true,
                message: "Comment updated successfully",
                data: comment
            });

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }

    // Delete Comment
    async deleteComment(req, res) {
        try {

            const comment = await Comment.findById(req.params.id);

            if (!comment) {
                return res.status(404).json({
                    status: false,
                    message: "Comment not found"
                });
            }

            if (comment.userId.toString() !== req.user._id.toString()) {
                return res.status(403).json({
                    status: false,
                    message: "Unauthorized"
                });
            }

            await Comment.findByIdAndDelete(req.params.id);

            return res.status(200).json({
                status: true,
                message: "Comment deleted successfully"
            });

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }

}

module.exports = new CommentController();