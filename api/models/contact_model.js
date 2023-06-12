//
const mongoose=require('mongoose');
const schema=mongoose.Schema;
const validator=require('validator');

//

const ContactSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
       
    },
    phone: {
      type: String,
      required: true,
      trim: true,
     
  },
    email:{
        type: String,
        required: true,
        trim: true,
       
      validate:{
        validator:(v)=>{
          return validator.isEmail(v)
        },
        message:`{VALUE} is not a valid email' `,
      }


    },
   

});

const Contact=mongoose.model('Contact', ContactSchema);
module.exports=Contact;











