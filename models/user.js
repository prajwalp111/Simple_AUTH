const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [ true, 'username cant be blank  ' ]
    },
    password : {
        type : String,
        required : [ true, 'password cant be blank  ' ]
    }
})

module.exports = mongoose.model('User',userSchema)