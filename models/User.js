const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  phoneNumber: {type: Number, required:true},
  password: { type: String, required: true },
  
  role: {
    type: String,
    enum : ['user','admin'],
    default: 'user'
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;