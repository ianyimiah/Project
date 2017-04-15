var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// This is the schema for the administrator
var supervisorSchema = Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    id: { type: String, required: true },
    name: { type: String, required: true },
    titles: { type: String },
    profileImage: { type: String }
});

supervisorSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null );
}

supervisorSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

var Supervisor = module.exports = mongoose.model( 'supervisor', supervisorSchema);   

// Functional utilities