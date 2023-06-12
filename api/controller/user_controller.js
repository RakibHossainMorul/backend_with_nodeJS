const User=require('../models/user_model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const signUpUserControoler=(req, res,next) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
            res.status(500).json({
                error: err
            });
        }else{
            const userBody=new User({
                email: req.body.email,
                password: hash,
                orginial: req.body.password
            });
            userBody.save().then(data => {
                res.status(201).json({
                    message: 'User added successfully!',
                    user: data
                });   
            
            }).catch((err) => {console.log(err)});
        }
    });
    
};


const loginUserController=(req, res, next) => {
let email=req.body.email;
let password=req.body.password;
User.findOne({email: email}).then(user => {
    if(user){
        bcrypt.compare(password, user.password, (err, result) => {
            if(err){
                res.status(500).json({
                    error: err
                });

            }
            if(result){

                const token=jwt.sign({
                    email: user.email,
                    userId: user._id
                },'SECRET_KEY',{expiresIn:'2h'});

                res.status(200).json({
                    message: 'Login Successful!',
                   token,
                    email: user.email,
                    password: user.password
                });
            }else{
                res.status(401).json({
                    message: 'Login Failed!'
                });
            }
        });
    }else{
        res.status(404).json({
            message: 'User not found!'
        });
    }
});

}


const getAllUser=(req, res, next) => {
    User.find().then(data => {
        res.status(200).json({
            message: 'All User',
            user: data
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
}



module.exports={
    signUpUserControoler,
    getAllUser,
    loginUserController
}