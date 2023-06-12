const express=require('express');
const router=express.Router();
const contactController=require('../../controller/contact_controller');
const checkAuth=require('../../middleware/authentication');


router.get('/',contactController.getAllContactController);
router.get('/:id',contactController.getSingleContactController);
router.post('/',checkAuth, contactController.postNewContactController);
router.delete('/:id',checkAuth, contactController.deleteSingleContactController);
router.put('/:id',checkAuth, contactController.editSingleContactController);



router.put('/:id', (req, res) => {
    res.status(202).json({
        message: 'Put request is working!'
    });
});



module.exports=router;
