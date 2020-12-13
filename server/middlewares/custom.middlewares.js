module.exports = {
    connectionChecker: (req, res, next) => req.isAuthenticated() ? next(console.log('estás conectado')) : res.status(403).json({ message: 'Unauthorized' }),
    roleChecker: admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.status(403).json({ message: 'Role Errror' })
}