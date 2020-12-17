const express = require('express')
const router = express.Router()


const {connectionChecker, roleChecker, idPetitionChecker} = require('../middlewares/custom.middlewares')

const Petition = require('./../models/Petition.model')

// Endpoints
router.get('/', (req, res) => {

    Petition
        .find({status: true})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.get('/giverpetitions/:user_id', roleChecker(['GIVER']), (req, res) => {

    Petition
        .find({giver: req.params.user_id, sent: false})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.get('/ownerpetitions/:user_id', roleChecker(['RECEIVER']), (req, res) => {

    Petition
        .find({owner: req.params.user_id, sent: false})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.get('/petitionById/:petition_id', idPetitionChecker, (req, res) => {

    Petition
        .findById(req.params.petition_id)
        .populate('owner', 'name')
        .populate('center', 'name')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.post('/new', connectionChecker, roleChecker(['ADMIN', 'RECEIVER']),(req, res) => {

    Petition
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.put('/edit/:petition_id', connectionChecker, idPetitionChecker, (req, res) => {

    Petition
        .findByIdAndUpdate(req.params.petition_id, req.body, {new: true})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

module.exports = router