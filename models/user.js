const mongoose = require('mongoose');
const Schema = mongoose.Schema;
bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;

const UserSchema = new Schema(
    {
        firstName : {type:String,required:true},
        lastName : {type:String,required:true},
        email : {type:String,required:true},
        password : {type:String,required:true}

    });

UserSchema.pre('save', function(next) {
  let user = this;
  if (!user.isModified('local.password'))
  	return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err)
    	return next(err);
    bcrypt.hash(user.local.password, salt, null, function(err, hash) {
      if (err)
      	return next(err);
      user.local.password = hash;
      next();
    });
  });
})

// compare password in the database and the one that the user type in
UserSchema.methods.comparePassword = function(password) {
  let user = this;
  return bcrypt.compareSync(password, user.password);
}
module.exports = mongoose.model('User', UserSchema);