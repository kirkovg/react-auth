import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
});

userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      return next(error);
    }

    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) {
        return next(error);
      }

      user.password = hash;
      next();
    });
  })
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
    if (error) return callback(error);
    callback(null, isMatch);
  });
};

const ModelClass = mongoose.model('user', userSchema);

export default ModelClass;
