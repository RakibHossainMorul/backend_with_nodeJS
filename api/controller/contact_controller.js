const Contact=require('../models/contact_model');

const getAllContactController=(req, res,next) => {
    Contact.find().then(
        contacts => {
            res.status(200).json({
                message: 'Contacts fetched successfully!',
                contacts
            });
        }
     ).catch(
        err => {
            console.log(err);
            res.status(500).json({
                message: 'Error Occured!',
                error: err
            });
        }
     );
};


const postNewContactController=(req, res,next) => {
    const contactBody=new Contact({

        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        

    })
    contactBody.save().then(data => {
        res.status(201).json({
            message: 'Contact added successfully!',
            contact: data
        });   
    
     }).catch((err) => {console.log(err)});
};

const getSingleContactController=(req, res,next) => {
    
    const id=req.params.id;
    Contact.findById(id).then(
        contact => {
            res.status(200).json({
                message: 'Contact fetched successfully!',
                contact
            });
        }
     ).catch(
        err => {
            console.log(err);
            res.status(500).json({
                message: 'Error Occured!',
                error: err
            });
        }
     );
     

}
const deleteSingleContactController=(req, res,next) => {
        
        const id=req.params.id;
        Contact.findByIdAndRemove(id).then(
            contact => {
                res.status(200).json({
                    message: 'Contact deleted successfully!',
                    contact
                });
            }
        ).catch(
            err => {
                console.log(err);
                res.status(500).json({
                    message: 'Error Occured!',
                    error: err
                });
            }
        );
}
const editSingleContactController=(req, res,next) => {
            
        let id=req.params.id;
        let updateContact={
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,

        }

        Contact.findByIdAndUpdate(id,{$set: updateContact}).then(
            contact => {
                Contact.findById(contact._id).then(newContact=>{
                    res.status(200).json({
                        message: 'Contact updated successfully!',
                        contact
                    });

                })
                
            }
        ).catch(
            err => {
                console.log(err);
                res.status(500).json({
                    message: 'Error Occured!',
                    error: err
                });
            }
        );
}


module.exports={
    getAllContactController,
    postNewContactController,
    getSingleContactController,
    deleteSingleContactController,
    editSingleContactController,
}