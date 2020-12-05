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
        required: true
    },
    address: {
        type: String,
        required: true
    },
    opening: {
        type: String,
        required: true
    }
    
}, {

    timestamps: true

})


const Center = mongoose.model('Center', centerSchema)
module.exports = Center