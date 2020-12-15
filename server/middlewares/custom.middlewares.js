const mongoose = require('mongoose')

module.exports = {
    connectionChecker: (req, res, next) => req.isAuthenticated() ? next() : res.status(403).json({ message: 'Unauthorized' }),
    roleChecker: admittedRoles => (req, res, next) => {

        console.log(user)

        //admittedRoles.includes(req.user.role) ? console.log(req.user) : res.status(403).json({ message: 'Role Error' })
            
    },
    idPetitionChecker: (req, res, next) => !mongoose.Types.ObjectId.isValid(req.params.petition_id) ? res.status(404).json({ message: 'Invalid ID' }) : next(),
    idProfileChecker: (req, res, next) => !mongoose.Types.ObjectId.isValid(req.params.user_id) ? res.status(404).json({ message: 'Invalid ID' }) : next(),
    idCenterChecker:(req, res, next) => !mongoose.Types.ObjectId.isValid(req.params.center_id) ? res.status(404).json({ message: 'Invalid ID' }) : next()
}