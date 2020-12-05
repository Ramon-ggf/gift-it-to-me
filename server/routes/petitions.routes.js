const express = require('express')
const router = express.Router()
const mongoose =

const Petition = require('./../models/Petition.model')

// Endpoints
router.get('/', (req, res) => res.json({ message: 'Estás en petitions' }))


module.exports = router
