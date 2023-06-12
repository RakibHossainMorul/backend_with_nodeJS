const express=require('express');
const router=express.Router();
const userController=require('../../controller/user_controller');
const checkAuth = require('../../middleware/authentication');


router.post('/signUp',userController.signUpUserControoler);
router.get('/AllUser',checkAuth,userController.getAllUser);
router.post('/login',userController.loginUserController);



module.exports=router;