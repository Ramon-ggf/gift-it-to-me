const mongoose = require('mongoose')
const Schema = mongoose.Schema

const centerSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        match: /^[679]{1}[0-9]{8}$/,
        minlength: 9
    },
    address: {
        type: String,
        required: true
    },
    opening: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'https://pngimage.net/wp-content/uploads/2018/06/silueta-casa-png-.png'
    },
    status: {
        type: Boolean,
        default: true
    }

}, {

    timestamps: true

})


const Center = mongoose.model('Center', centerSchema)
module.exports = Center