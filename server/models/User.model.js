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
        required: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'GIVER', 'RECEIVER'],
        required: true
    },
    image: {
        type: String,
        default: 'https://www.pngfind.com/pngs/m/93-938050_png-file-transparent-white-user-icon-png-download.png'
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