const jwt = require('jsonwebtoken')

const AdminAuthCheck = async(req,res,next)=>{
    const token = req?.body?.token||req?.query?.token||req?.headers['x-access-token']||req?.headers['authorization'];
    if(!token){
        return res.status(400).json({
            status:false,
            message: 'Token is required for authentication'
        })
    } 
    try{
        const decode = jwt.verify(token, process.env.ADMIN_JWT_SECRET)
        req.admin = decode
        console.log(('afterlogin user', req.admin));
        
    }catch(error){
        return res.status(400).json({
            status: false,
            message: 'Invalid Token'
        })
    }
    return next();
}

module.exports=AdminAuthCheck;