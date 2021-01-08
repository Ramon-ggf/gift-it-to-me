const express = require('express')
const router = express.Router()


const { connectionChecker, roleChecker, idMongooseChecker } = require('../middlewares/custom.middlewares')

const Petition = require('./../models/Petition.model')

// Endpoints
router.get('/', (req, res) => {

    Petition
        .find({ status: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.get('/mypetitions/:user_id', roleChecker(['GIVER', 'RECEIVER']), (req, res) => {

    let searchCriteria;

    if (req.user.role === 'GIVER') {
        
        searchCriteria = { giver: req.params.user_id, sent: false }

    } else {

        searchCriteria = {owner: req.params.user_id, sent: false}
    }

    Petition
        .find(searchCriteria)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.get('/petitionById/:petition_id', idMongooseChecker, (req, res) => {

    Petition
        .findById(req.params.petition_id)
        .populate('owner', 'name')
        .populate('center', 'name')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.post('/new', connectionChecker, roleChecker(['ADMIN', 'RECEIVER']), (req, res) => {

    Petition
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.put('/edit/:petition_id', connectionChecker, idMongooseChecker, (req, res) => {

    Petition
        .findByIdAndUpdate(req.params.petition_id, req.body, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

module.exports = router