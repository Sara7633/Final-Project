const jwt=require('jsonwebtoken')

const verifyJWT=(req,res,next)=>{
 
    const authHeaders=req.headers.Authorization || req.headers.authorization
    if(!authHeaders?.startsWith('Bearer '))
        return res.status(401).json({message: "Unauthorzation"})
    const token =authHeaders.split(" ")[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decode)=>{
            if(err)
             return res.status(403).json({message:'Forbidden'})
            req.user=decode
            next()
        }
    )
}
module.exports=verifyJWT