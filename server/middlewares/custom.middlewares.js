module.exports = {
    connectionChecker: (req, res, next) => req.isAuthenticated() ? next() : res.status(403).json({ message: 'Unauthorized' }),
    roleChecker: admittedRoles => (req, res, next) => {

        console.log(req.user)

        //admittedRoles.includes(req.user.role) ? console.log(req.user) : res.status(403).json({ message: 'Role Error' })
            
    }
}