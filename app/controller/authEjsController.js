const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthEjsController {

    //check middleware controller

    async CheckAuth(req, res, next) {
        try {
            if (req.user) {
                next()
            } else {
                res.redirect('/login');
            }
        } catch (err) {
            console.log(err)
        }
    }
    registerview(req, res) {
        res.render("register");
    }

    async registercreate(req, res) {
        try {
            const { name, email, phone, password } = req.body;
            if (!name || !email || !phone || !password) {
                console.log("all filed required");

                return res.redirect("/register");
            }
            const existUser = await User.findOne({ email });
            if (existUser) {
                console.log("user already exist");

                return res.redirect("/register");
            }
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const userdata = new User({
                name,
                email,
                phone,
                password: hashPassword,
            });
            const result = await userdata.save();
            if (result) {
                console.log("user created successfully", result);
                return res.redirect("/login");
            }
        } catch (error) {
            console.log(error.message);
            return res.redirect("/register");
        }
    }
    loginview(req, res) {
        res.render("login");
    }

    async logincreate(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.redirect("/login");
                console.log("all filed require");
            }

            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                return res.redirect("/login");
                console.log("user not found");
            }

            const isMatch = await bcrypt.compare(password, existingUser.password);
            if (!isMatch) {
                return res.redirect("/login");
                console.log("invalid credentials");
            } else {
                const token = jwt.sign(
                    {
                        id: existingUser._id,
                        name: existingUser.name,
                        email: existingUser.email,
                        phone: existingUser.phone,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "1d" },
                );

                //   const cookieOptions={
                //     expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
                //     httpOnly:true
                //   }

                if (token) {
                    res.cookie("token", token);
                    return res.redirect("/dashboard");
                } else {
                    return res.redirect("/login");
                    console.log("invalid credentials");
                }
            }
        } catch (error) {
            return res.redirect("/login");
            console.log(error.message);
        }
    }


    dashboard(req, res) {
        res.render("dashboard", {
            data: req.user
        });
    }

    Logout(req, res) {
        res.clearCookie("token");
        res.redirect("/login");
    }
}

module.exports = new AuthEjsController();