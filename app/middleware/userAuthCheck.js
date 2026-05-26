const jwt = require('jsonwebtoken')

const UserAuthCheck = async(req,res,next)=>{
    const token = req?.body?.token||req?.query?.token||req?.headers['x-access-token']||req?.headers['authorization'];
    if(!token){
        return res.status(400).json({
            status:false,
            message: 'Token is required for authentication'
        })
    } 
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        console.log(('after login user', req.user));
        
    }catch(error){
        return res.status(400).json({
            status: false,
            message: 'Invalid Token'
        })
    }
    return next();
}

module.exports=UserAuthCheck;