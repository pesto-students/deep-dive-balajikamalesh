const { Schema, Model } = require('../../odm-lib');

//type - Array , Object , Number , Date 

const userSchema = new Schema({
  username: { type: 'string', required: true, default: "user" },
  password: { type: 'string', required: true, default: "123" },
});

userSchema.postSave = function() {
  console.log('post');
  return true
};

userSchema.preSave = function() {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      console.log("pre")
      resolve('pre')
    },2000)
  })
};

let userModel = null;

function User() {
   userModel ? userModel : userModel = new Model('user', todoSchema);
   return userModel;
}

module.exports = { User };