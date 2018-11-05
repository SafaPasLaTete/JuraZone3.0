const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
const User = require('./users')
// Define the schema for messages
const messageSchema = new Schema({
  contenu: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250,
  },
/*location: {
        type: {
            type: String, 
            enum: ['Point'], 
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true,
            default:  [-122.5, 37.7]
        } 
    }, BEST PRACTICE but we're not able to make it work'*/
     posLatitude: {
        type: Number,
        default: 0.000000,
      required: 'The latitude is required'
    },
    posLongitude: {
        type: Number,
        default: 0.000000,
       required: 'The longitude is required'
    },
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
        validate: {
          isAsync: true,
          // Validate that the director is a valid ObjectId
          // and references an existing person
          validator: validateAuthor
        }
  },
    theme: {
    type: Schema.Types.ObjectId,
    ref: 'Theme',
    default: null,
    validate: {
          isAsync: true,
      // Validate that the director is a valid ObjectId
      // and references an existing person
      validator: validateTheme
        }
    }
});
    

/**
 * Given a person ID, ensures that it references an existing person.
 *
 */
function validateAuthor(value, callback) {
  if (!ObjectId.isValid(value)) {
    this.invalidate('author', 'Path `author` is not a valid Person reference', value, 'resourceNotFound');
    return callback();
  }

  mongoose.model('User').findOne({ _id: ObjectId(value) }).exec(function(err, user) {
    if (err || !user) {
      this.invalidate('author', 'Path `author` does not reference a Person that exists', value, 'resourceNotFound');
    }

    callback();
  });
}
/**
*
*same for the theme
*
*/
function validateTheme(value, callback) {
  if (!ObjectId.isValid(value)) {
    this.invalidate('theme', 'Path `theme` is not a valid Theme reference', value, 'resourceNotFound');
    return callback();
  }

  mongoose.model('Theme').findOne({ _id: ObjectId(value) }).exec(function(err, person) {
    if (err || !person) {
      this.invalidate('theme', 'Path `theme` does not reference a Theme that exists', value, 'resourceNotFound');
    }

    callback();
  });
}

    
// Create the model from the schema and export it
module.exports = mongoose.model('Message', messageSchema);