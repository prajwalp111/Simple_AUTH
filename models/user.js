const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

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


userSchema.statics.findandValidate = async function(username, password){
    const foundUser = await this.findOne({username});
    const isValid = await bcrypt.compare(password, foundUser.password)
    return isValid ? foundUser : false
}

userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 12)
    next()
})



module.exports = mongoose.model('User',userSchema)