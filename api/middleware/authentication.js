const jwt=require('jsonwebtoken');


const authentication=(req, res, next) => {



    try{
        const token=req.headers.authorization.split(" ")[1];
        const decoded=jwt.verify(token, 'SECRET_KEY');
        req.userData=decoded;
        next();
    }catch(error){
        res.status(401).json({
            message: 'Authentication Failed!'
        });
    }


}

module.exports=authentication;