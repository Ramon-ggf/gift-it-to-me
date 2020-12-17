const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    },
    role: {
        type: String,
        enum: ['ADMIN', 'GIVER', 'RECEIVER'],
        required: true
    },
    image: {
        type: String,
        default: 'https://i.pinimg.com/originals/ec/61/d3/ec61d3114cc5269485d508244f531bdf.png'
    },
    status: {
        type: Boolean,
        default: true
    }

}, {

    timestamps: true

})


const User = mongoose.model('User', userSchema)
module.exports = User