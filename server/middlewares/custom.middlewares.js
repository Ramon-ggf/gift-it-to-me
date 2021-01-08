const mongoose = require('mongoose')

module.exports = {
    connectionChecker: (req, res, next) => req.isAuthenticated() ? next() : res.status(403).json({ message: 'Unauthorized' }),
    roleChecker: admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.status(403).json({ message: 'Role Error' }),
    idMongooseChecker: (req, res, next) => {
        let itemId

        if (req.params.center_id) {

            itemId = req.params.center_id

        } else if (req.params.petition_id) {
            
            itemId = req.params.petition_id

        } else {
            
            itemId = req.params.user_id

        }
        
        !mongoose.Types.ObjectId.isValid(itemId) ? res.status(404).json({ message: 'Invalid ID' }) : next()
    }
}