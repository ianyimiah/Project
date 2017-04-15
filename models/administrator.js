var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// This is the schema for the administrator
var administratorSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    id: { type: String, required: true },
    name: { type: String, required: true },
    titles: {type: String, required: false},
    profileImage: { type: String, required: false }
});


var Administrator = module.exports = mongoose.model( 'Administrator', administratorSchema);   

// Functional utilities
