import jwt from 'jsonwebtoken';

function authMiddleWare (req, res, next){

    const token = req.headers['authorization']

    if(!token){
        return res.status(401).json({message:"no token provided"});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){ return res.status(401).json({message:"Invalid token or token expired"})}
        req.userId = decoded.id;
        next();

    })

}

export default authMiddleWare