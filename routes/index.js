const router = require('express').Router();
const controller = require('../controllers')


router.get('/getUsers',(req,res)=>{
    controller.getAllUsers(req,res);
});

router.post('/addUser',(req,res)=>{
    controller.addUser(req,res);
})

router.get('/getUser/:email',(req,res)=>{
    controller.getUser(req,res);
})

router.post('/deleteUser',(req,res)=>{
    controller.deleteUser(req,res);
})

router.post('/login',(req,res)=>{
    controller.logUser(req,res);
})

module.exports=router;