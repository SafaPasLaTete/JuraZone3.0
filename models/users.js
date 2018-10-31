const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


// Define the schema for users
let userSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    unique: true,
    validate: {
      isAsync:true,
      validator: validatePseudoUniqueness,
      message: 'User {VALUE} already exists'
    }
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  modificationAt: {
  type: Date,
  default: Date.now
  }
});
// Customize the behavior of person.toJSON() (called when using res.send)
userSchema.set('toJSON', {
  transform: transformJsonUser, 
  virtuals: true 
});

/**
 * Given a name, calls the callback function with true if no person exists with that name
 * (or the only person that exists is the same as the person being validated).
 */
function validatePseudoUniqueness(value, callback) {
  const user = this;
  this.constructor.findOne().where('name').equals(value).exec(function(err, existingUser) {
    callback(!err && (!existingUser || existingUser._id.equals(user._id)));
  });
}

/**
 * Removes extra MongoDB properties from serialized people.
 */
function transformJsonUser(doc, json, options) {

  // Remove MongoDB _id & __v (there's a default virtual "id" property)
  delete json._id;
  delete json.__v;

  return json;
}

userSchema.statics.verifyCredentials = function (pseudo, password, callback) {
    User.findOne({pseudo: pseudo}).exec(function (err, user) {
        if (err) {

            return callback(err)
        }
        if (user === null) {
            const err = new Error()
            err.status = 404
            err.message = 'User Not Found'
            return callback(err)
        }

        bcrypt.compare(password, user.password, function (err, valid) {
            // Handle error and password validity...
            if (err) {
                return callback(err);
            } else if (!valid) {
                const err = new Error('invalid password')
                err.status = 401
                err.message = 'invalid password'
                return callback(err)
            }

            callback(undefined, user)
        })
    })
}

userSchema.methods.generateJwt = function (callback) {

    jwt.sign({
            sub: this._id,
            exp: (new Date().getTime() + 7 * 24 * 3600 * 1000) / 1000,
            iat: Date.now(),
        })
}
// Create the model from the schema and export it
let User = mongoose.model('users', userSchema);
module.exports = User;

