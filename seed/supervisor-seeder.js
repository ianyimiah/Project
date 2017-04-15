var Supervisor = require('../models/supervisor');
var mongoose = require('mongoose');

// connect to mongoose
mongoose.connect('mongodb://127.0.0.1:27017/projdb');

var supervisors = [
    new Supervisor({
        id: '1111',
        name: 'John Lens',
        password: '123456',
        username: 'jlen',
        email: 'jlen@gmail.com',
        profileImage: 'http://placehold.it/350x200',
    }),
    new Supervisor({
        id: '7777',
        name: 'Doxin Kreg',
        password: '123456',
        username: 'dilx',
        email: 'dilx@gmail.com',
        profileImage: 'http://placehold.it/350x200',
    }),
    new Supervisor({
        id: '3333',
        name: 'Rity Pink',
        password: '123456',
        username: 'rit',
        email: 'rit@gmail.com',
        profileImage: 'http://placehold.it/350x200',
    }),
    new Supervisor({
        id: '6666',
        name: 'Ryan Canon',
        password: '123456',
        username: 'rycan',
        email: 'rycan@gmail.com',
        profileImage: 'http://placehold.it/350x200',
    }),
];

var done = 0;
for(var i = 0; i < supervisors.length; i++){
    supervisors[i].save(function(err, results){
        done++;
        if(done === supervisors.length){
             exit()
        }
    });
}

var exit = function(){
    mongoose.disconnect();
}