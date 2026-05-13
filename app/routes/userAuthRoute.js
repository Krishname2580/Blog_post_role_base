const express=require('express')
const userAuthController = require('../controller/userAuthController')
const UserAuthCheck = require('../middleware/userAuthCheck')
const adminAuthController = require('../controller/adminAuthController')
const AdminAuthCheck = require('../middleware/adminAuthCheck')
const authorAuthController = require('../controller/authorAuthController')
const AuthorAuthCheck = require('../middleware/authorAuthCheck')
const router=express.Router()




router.post('/register',userAuthController.Register)
router.post('/login',userAuthController.login)
router.get('/dashboard',UserAuthCheck,userAuthController.dashboard)
router.post('/refresh-token', userAuthController.refreshToken);




//admin login 
router.post('/admin/login',adminAuthController.adminlogin)
router.get('/admin/dashboard',AdminAuthCheck,adminAuthController.admindashboard)

//author login
router.post('/author/login',authorAuthController.authorlogin)
router.get('/author/dashboard',AuthorAuthCheck,authorAuthController.authordashboard)



module.exports=router