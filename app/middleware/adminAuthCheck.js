const jwt = require("jsonwebtoken");
const User = require("../models/user");

const AdminAuthCheck = async (req, res, next) => {
    try {
        let token =
            req.body.token ||
            req.query.token ||
            req.headers["x-access-token"] ||
            req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Token is required for authentication"
            });
        }

        // Remove "Bearer " if present
        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }

        const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

        const admin = await User.findById(decoded.id);

        if (!admin) {
            return res.status(401).json({
                status: false,
                message: "Admin not found"
            });
        }

        req.user = admin;
        req.admin = admin;

        next();

    } catch (error) {
        return res.status(401).json({
            status: false,
            message: "Invalid Token"
        });
    }
};

module.exports = AdminAuthCheck;