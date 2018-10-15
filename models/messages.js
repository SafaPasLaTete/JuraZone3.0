const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;
// Define the schema for users
const messageSchema = new Schema({
  contenu: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250,
  },
  position: {
    type: String,
    required: true,
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
    /*theme: {
    type: Schema.Types.ObjectId,
    ref: 'Theme',
    default: null,
    validate: {
      // Validate that the director is a valid ObjectId
      // and references an existing person
      validator: validateTheme
        }
    }*/
});
    

// Customize the behavior of movie.toJSON() (called when using res.send)
messageSchema.set('toJSON', {
  transform: transformJsonMessage, // Modify the serialized JSON with a custom function
  virtuals: true // Include virtual properties when serializing documents to JSON
});

/**
 * Given a person ID, ensures that it references an existing person.
 *
 * If it's not the case or the ID is missing or not a valid object ID,
 * the "authorHref" property is invalidated instead of "director".
 * (That way, the client gets an error on "authorHref", which is the
 * property they sent, rather than "director", which they don't know.)
 */
function validateAuthor(value, callback) {
  if (!ObjectId.isValid(value)) {
    this.invalidate('author', 'Path `author` is not a valid Person reference', value, 'resourceNotFound');
    return callback();
  }

  mongoose.model('User').findOne({ _id: ObjectId(value) }).exec(function(err, person) {
    if (err || !user) {
      this.invalidate('author', 'Path `author` does not reference a Person that exists', value, 'resourceNotFound');
    }

    callback();
  });
}
/**
 * Removes extra MongoDB properties from serialized movies,
 * and includes the director's data if it has been populated.
 */
function transformJsonMessage(doc, json, options) {

  // Remove MongoDB _id & __v (there's a default virtual "id" property)
  delete json._id;
  delete json.__v;

  if (json.author instanceof ObjectId) {
    // Remove the director property by default (there's a "atuhorHref" virtual property)
    delete json.author;
  } else if (json.author) {
    // If the director was populated, include it in the serialization
    json.author = doc.author.toJSON();
  }

  return json;
}
    
// Create the model from the schema and export it
module.exports = mongoose.model('Message', messageSchema);