const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class AuthorAuthController {
  async authorlogin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          status: false,
          message: "All fields are required",
        });
      }

      const user = await User.findOne({ email });
      // console.log("user", user.name);

      if (!user) {
        return res.status(400).json({
          status: false,
          message: "User does not exist",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          status: false,
          message: "Password does not match",
        });
      }

      if (user.role == "author") {
        //token
        const token = jwt.sign(
          {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          process.env.AUTHOR_JWT_SECRET,
          { expiresIn: "1d" },
        );

        return res.status(200).json({
          status: true,
          message: "author logged in successfully",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token: token,
        });
      }else{
        return res.status(400).json({
          status: false,
          message: "You are not an author",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async authordashboard(req, res) {
    try {
      return res.status(200).json({
        status: true,
        message: "welcome to author dashboard",
        user: req.author,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }
}

module.exports = new AuthorAuthController();