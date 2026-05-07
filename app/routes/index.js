
const express=require('express')

const router=express.Router()
const authEjsRoutes=require('./authEjsRoute')





// this route for ejs
router.use(authEjsRoutes)


module.exports=router