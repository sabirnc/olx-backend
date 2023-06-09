const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const Schema  = mongoose.Schema

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

userSchema.pre('save' , async function (next){
   const salt = await bcrypt.genSalt()
   this.password = await bcrypt.hash(this.password , salt)
   next()
}) 

module.exports = mongoose.model('user' , userSchema) 