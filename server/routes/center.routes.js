const express = require('express')
const router = express.Router()

const {connectionChecker, roleChecker, idMongooseChecker} = require ('../middlewares/custom.middlewares')

const Center = require('./../models/Center.model')

// Endpoints
router.get('/', (req, res) => {

    Center
        .find({status: true})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.get('/centerById/:center_id', idMongooseChecker, (req, res) => {

    Center
        .findById(req.params.center_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.post('/new', connectionChecker, roleChecker(['ADMIN']), (req, res) => {

    Center
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.put('/edit/:center_id', connectionChecker, roleChecker(['ADMIN']), idMongooseChecker, (req, res) => {

    Center
        .findByIdAndUpdate(req.params.center_id, req.body, {new: true})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

module.exports = router