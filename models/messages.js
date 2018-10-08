const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the schema for users
const messageSchema = new Schema({
  id: String
});
// Create the model from the schema and export it
module.exports = mongoose.model('Message', messageSchema);