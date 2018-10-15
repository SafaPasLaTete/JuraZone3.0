const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the schema for users
const usersSchema = new Schema({
  pseudo: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    unique: true,
    validate: {
      
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
usersSchema.set('toJSON', {
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
// Create the model from the schema and export it
module.exports = mongoose.model('User', usersSchema);

