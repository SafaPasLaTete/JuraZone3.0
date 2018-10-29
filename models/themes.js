const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the schema for users
const themeSchema = new Schema({
    name :{

        type: String,
        required : true,
        unique: true,
        validate : {

            validator: validateThemeNameUniqueness,
            message: 'theme {VALUE} already exists',
            isAsync: true,

        }

    },

    image : {

        type : String,
        required: false,

    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});



function validateThemeNameUniqueness(value, callback) {
    const theme = this;
    this.constructor.findOne().where('name').equals(value).exec(function(err, existingThemes) {
        callback(!err && (!existingThemes || existingThemes._id.equals(theme._id)));
    });
}
// Create the model from the schema and export it
module.exports = mongoose.model('Theme', themeSchema)