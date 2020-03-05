const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});

function getAllUsers(req,res){

	const jwt = require('jsonwebtoken');
	const token = req.header('Authorization').replace('Bearer ', '');

	try {
		const nbOfRequest = client.get(token, redis.print);
		if (nbOfRequest > 3) {
			res.json("Too many request !");
		}
	    const payload = jwt.verify(token, "test") ;
		
	    const User = require('../models/user');
	    User.find({}, function(err, users) {
	    	if (err) throw err;
	    	console.log("Token");
	    	console.log("Token ",client.get(token,redis.print));
	    	var newTokenValue;
	    	client.get(token,function(err,value) {
	    		newTokenValue = value+1;
	    		console.log("Token value ",newTokenValue);
	    	});
		    console.log(newTokenValue);
		    client.set(token, newTokenValue, redis.print);
		    res.json(users);
	    });
	} 
	catch(error) {
    	res.json(error.message);
	}  
}

function getUser(req,res) {
	const User = require('../models/user');

    User.find({email : req.params.email}, function(err, user) {

        if (err) throw err;

        res.json(user);

    });
}

function addUser(req, res) {
	const User = require('../models/user');
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

function deleteUser(req,res){
	const User = require('../models/user');
	User.findOneAndRemove(
		{email:req.body.email},function(err,deleteRes) {
			if (err) throw err;
			res.json({Info:'Success'});
		});
}

function logUser(req,res){
	const User = require('../models/user');
	User.findOne({email:req.body.email},function(err,user) {

		if (err) throw err;
		if (user==null) {
			res.json({Error:'User not existing'});
		}

		if (user.comparePassword(req.body.password)) {

			const jwt = require('jsonwebtoken');
			const token = jwt.sign({_id: user.email, auth: true},"test", {expiresIn: '1 day'});
			res.json({Info:token});
		}
		else {
			res.json({Info:'Auth failed'});
		}
	});
}

module.exports.getAllUsers=getAllUsers;
module.exports.addUser=addUser;
module.exports.getUser=getUser;
module.exports.deleteUser=deleteUser;
module.exports.logUser=logUser;