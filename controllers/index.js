
const User = require('../models/user');

function getAllUsers(req,res){
    
    User.find({}, function(err, users) {
        if (err) throw err;
        console.log(users);
        res.json(users);
    });
}

function addUser(req, res) {


  const newUser = User ({
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email,
      password : req.body.password
  });
  console.log(req.body);
  newUser.save(function(err) {
    if (err) throw err;
    res.json({info: 'Success'});

  });

}

module.exports.getAllUsers=getAllUsers;
module.exports.addUser=addUser;