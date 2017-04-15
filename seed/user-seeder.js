var User = require('../models/user');
var mongoose = require('mongoose');

// connect to mongoose
mongoose.connect('mongodb://127.0.0.1:27017/projdb');

var users = [
    new User({
        password: '123456',
        email: 'nwil@gmail.com'
    }),
    new User({
        password: '123456',
        email: 'dil@gmail.com',
    }),
    new User({
        password: '123456',
        email: 'erblack@gmail.com',
    }),
    new User({
        password: '123456',
        email: 'chan@gmail.com',
    }),
];

var done = 0;
for(var i = 0; i < users.length; i++){
    users[i].save(function(err, results){
        done++;
        if(done === users.length){
             exit()
        }
    });
}

var exit = function(){
    mongoose.disconnect();
}