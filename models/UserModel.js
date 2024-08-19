const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });
  
  UserSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
const UserModel = mongoose.model('users', UserSchema)  
module.exports = UserModel

