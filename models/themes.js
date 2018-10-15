const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the schema for users
const themeSchema = new Schema({
    nom :{

        type: String,
        required : true,
        unique: true,
        validate : {

            validator: validateThemeNameUniqueness,
            message: 'Person {VALUE} already exists'

        }

    },

    image : {

        type : String,
        required: false,

    }
});



function validateThemeNameUniqueness(value, callback) {
    const theme = this;
    this.constructor.findOne().where('nom').equals(value).exec(function(err, existingThemes) {
        callback(!err && (!existingThemes || existingThemes._id.equals(Themes._id)));
    });
}
// Create the model from the schema and export it
module.exports = mongoose.model('themes', themeSchema)