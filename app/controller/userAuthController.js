const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const generateAccessToken = require('../utils/generateAccessToken')
const generateRefreshToken = require('../utils/generateRefreshToken')



class UserAuthController {


    async Register(req, res) {

        try {
            const { name, email, password } = req.body

            if (!name || !email || !password) {
                return res.status(400).json({
                    status: false,
                    message: 'All fields are required'
                })
            }

            const existUser = await User.findOne({ email })
            if (existUser) {
                return res.status(400).json({
                    status: false,
                    message: 'User already exist'
                })
            }
            //hash password
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const user = await User.create({
                name,
                email,
                password: hashPassword
            })


            return res.status(200).json({
                status: true,
                message: 'User created successfully',
                data: user
            })

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            })

        }

    }

    async login(req, res) {
        try {
            const { email, password } = req.body

            if (!email || !password) {
                return res.status(400).json({
                    status: false,
                    message: 'All fields are required'
                })
            }

            const user = await User.findOne({ email })

            console.log(user);
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'User does not exist'
                })
            }
            // console.log('user', user.name);
            
            // if (!user.isVerified) {
            //     return res.status(400).json({
            //         status: false,
            //         message: 'User is not verified'
            //     })
            // }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({
                    status: false,
                    message: 'Password does not match'
                })
            }


            //token
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            user.refreshToken = refreshToken;
            await user.save();


            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
            });


            if (!accessToken) {
                return res.status(400).json({
                    status: false,
                    message: 'Token not created'
                })
            }
            return res.status(200).json({
                status: true,
                message: 'User logged in successfully',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                accessToken,
                refreshToken
            })

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            })
        }

    }

    async refreshToken(req, res) {

        try {
            const token = req.cookies.refreshToken;

            if (!token) {
                return res.status(401).json({
                    message: "No refresh token"
                });
            }

            jwt.verify(token, process.env.REFRESH_JWT_SECRET, 
                async (err, decoded) => {

                if (err) {
                    return res.status(403).json({
                        message: "Invalid refresh token"
                    });
                }

                const user = await User.findById(decoded.id);

                if (!user) {
                    return res.status(404).json({
                        message: "User not found"
                    });
                }
                const accessToken = generateAccessToken(user);

                res.status(200).json({
                    accessToken
                });
            });

        } catch (error) {

            console.log(error);
        }
    }

    async dashboard(req, res) {
        try {
            return res.status(200).json({
                status: true,
                message: 'welcome to User dashboard',
                user: req.user
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message,

            })
        }
    }
}


module.exports = new UserAuthController()