const express=require('express')
const authEjsController = require('../controller/authEjsController')
const AuthCheck = require('../middleware/AuthCheck')



const router=express.Router()


router.get('/register',authEjsController.registerview)
router.post('/register/create',authEjsController.registercreate)
router.get('/login',authEjsController.loginview)
router.post('/login/create',authEjsController.logincreate)
router.get('/dashboard',AuthCheck,authEjsController.CheckAuth,authEjsController.dashboard)
router.get('/Logout',AuthCheck,authEjsController.CheckAuth,authEjsController.Logout)



module.exports=router