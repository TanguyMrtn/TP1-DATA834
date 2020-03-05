const router = require('express').Router();
const controller = require('../controllers')


router.get('/getUser',(req,res)=>{
    controller.getAllUsers(req,res);
});

router.post('/addUser',(req,res)=>{
    controller.addUser(req,res);
})

module.exports=router;