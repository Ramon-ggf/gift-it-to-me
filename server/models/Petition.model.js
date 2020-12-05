const mongoose = require('mongoose')
const Schema = mongoose.Schema

const petitionSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        enum: ['masculino', 'femenino', 'no definido'],
        required: true
    },
    image: {
        type: String,
        default: 'https://www.vhv.rs/dpng/d/11-119235_free-gift-icon-png-transparent-png.png',
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        sparse: true
    },
    giver: {
        type: Schema.Types.ObjectId,
        ref: "User",
        sparse: true
    },
    center: {
        type: String
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    sent: {
        type: Boolean,
        required: true,
        default: false
    }

}, {

    timestamps: true

})


const Petition = mongoose.model('Petition', petitionSchema)
module.exports = Petition