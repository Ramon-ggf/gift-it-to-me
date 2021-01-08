const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const {connectionChecker, roleChecker, idMongooseChecker} = require ('../middlewares/custom.middlewares')

const User = require('./../models/User.model')

// Endpoints
router.get('/', (req, res) => {

    User
        .find({ status: true }).sort({name: 1})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.get('/userById/:user_id', idMongooseChecker, (req, res) => {
    
    User
        .findById(req.params.user_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})


router.put('/edit/:user_id', (req, res) => {

    User
        .findByIdAndUpdate(req.params.user_id, req.body, {new: true})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

module.exports = router