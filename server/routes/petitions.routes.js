const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Petition = require('./../models/Petition.model')

// Endpoints
router.get('/', (req, res) => {

    Petition
        .find({sent: false})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.get('/petitionById/:petition_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.petition_id)) {

        return res.status(404).json({ message: 'Invalid ID' })
    }

    Petition
        .findById(req.params.petition_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.post('/new', (req, res) => {

    Petition
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.put('/edit/:petition_id', (req, res) => {

    Petition
        .findByIdAndUpdate(req.params.petition_id, req.body, {new: true})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})



module.exports = router