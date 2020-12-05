const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Center = require('./../models/Center.model')

// Endpoints
router.get('/', (req, res) => {

    Center
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.get('/centerById/:center_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.center_id)) {

        return res.status(404).json({ message: 'Invalid ID' })
    }

    Center
        .findById(req.params.center_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.post('/new', (req, res) => {

    Center
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.put('/edit/:center_id', (req, res) => {

    Center
        .findByIdAndUpdate(req.params.center_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

module.exports = router