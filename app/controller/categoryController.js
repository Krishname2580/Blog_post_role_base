const Category = require("../models/Category");

class CategoryController {

    // Create Category
    async createCategory(req, res) {
        try {

            const { categoryName } = req.body;

            if (!categoryName) {
                return res.status(400).json({
                    success: false,
                    message: "Category name is required"
                });
            }

            const existingCategory = await Category.findOne({ categoryName });

            if (existingCategory) {
                return res.status(400).json({
                    success: false,
                    message: "Category already exists"
                });
            }

            const category = await Category.create({
                categoryName,
                createdBy: req.user._id
            });

            return res.status(201).json({
                success: true,
                message: "Category created successfully",
                data: category
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get All Categories
    async getAllCategories(req, res) {
        try {

            const categories = await Category.find()
                .populate("createdBy", "name email role")
                .sort({ createdAt: -1 });

            return res.status(200).json({
                success: true,
                count: categories.length,
                data: categories
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get Single Category
    async getCategoryById(req, res) {
        try {

            const category = await Category.findById(req.params.id)
                .populate("createdBy", "name email role");

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: "Category not found"
                });
            }

            return res.status(200).json({
                success: true,
                data: category
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Update Category
    async updateCategory(req, res) {
        try {

            const { categoryName } = req.body;

            const category = await Category.findById(req.params.id);

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: "Category not found"
                });
            }

            if (categoryName) {
                category.categoryName = categoryName;
            }

            await category.save();

            return res.status(200).json({
                success: true,
                message: "Category updated successfully",
                data: category
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Delete Category
    async deleteCategory(req, res) {
        try {

            const category = await Category.findById(req.params.id);

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: "Category not found"
                });
            }

            await Category.findByIdAndDelete(req.params.id);

            return res.status(200).json({
                success: true,
                message: "Category deleted successfully"
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

}

module.exports = new CategoryController();