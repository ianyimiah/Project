var Administrator = require('../models/administrator');
var mongoose = require('mongoose');

// connect to mongoose
mongoose.connect('mongodb://127.0.0.1:27017/projdb');

var administrators = [
    new Administrator({
        id: '4569',
        name: 'Rob Mack',
        password: '123456',
        username: 'NWilson',
        email: 'nwil@gmail.com',
        profileImage: 'http://placehold.it/350x200',
    }),
    new Administrator({
        id: '7894',
        name: 'Dil Watson',
        password: '123456',
        username: 'dil',
        email: 'dil@gmail.com',
        profileImage: 'http://placehold.it/350x200',
    }),
    new Administrator({
        id: '1234',
        name: 'Eren Black',
        password: '123456',
        username: 'erblack',
        email: 'erblack@gmail.com',
        profileImage: 'http://placehold.it/350x200',
    }),
    new Administrator({
        id: '6547',
        name: 'Christopher Chance',
        password: '123456',
        username: 'chan',
        email: 'chan@gmail.com',
        profileImage: 'http://placehold.it/350x200',
    }),
];

var done = 0;
for(var i = 0; i < administrators.length; i++){
    administrators[i].save(function(err, results){
        done++;
        if(done === administrators.length){
             exit()
        }
    });
}

var exit = function(){
    mongoose.disconnect();
}