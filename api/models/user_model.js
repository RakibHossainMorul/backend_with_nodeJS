const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const validator=require('validator');

const UserSchema= new Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        validate:{
            validator:(v)=>{
                return validator.isEmail(v)
            }
        },
       
    },
    password:{
        type:String,
    }
});

const User=mongoose.model('User', UserSchema);
module.exports=User;