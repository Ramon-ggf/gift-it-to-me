const express = require('express')
const router = express.Router()
const passport = require("passport")
const bcrypt = require("bcryptjs")

const User = require('./../models/User.model')

// Endpoints
router.post('/signup', (req, res) => {

    let { name, lastname, password, email, role, image } = req.body

    if (!name || !lastname || !password || !email) {

        return res.status(400).json({ message: 'Debes rellenar todos los campos.' })

    }

    if (password.length < 3) {

        return res.status(400).json({ message: 'La contraseña debe contener al menos 8 caracteres.' })

    }

    User
        .findOne({ email })
        .then(response => {

            if (response) {

                return res.status(400).json({ message: 'El usuario ya existe.' })

            }

            const salt = bcrypt.genSaltSync(10)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ name, lastname, password: hashPass, email, role, image })
                .then(response => res.json({ user: response }))
                .catch(() => res.status(500).json({ message: 'Error saving user to DB' }))

        })

})

router.post('/login', (req, res, next) => {

    passport.authenticate('local', (err, theUser, failureDetails) => {

        if (err) {
            res.status(500).json({ message: 'Error authenticating user' });
            return;
        }

        if (!theUser) {
            res.status(401).json(failureDetails);
            return;
        }

        req.login(theUser, err => err ? res.status(500).json({ message: 'Session error' }) : res.status(200).json(theUser))

    })(req, res, next)

})

router.post('/logout', (req, res) => {
    req.logout()
    res.status(200).json({ message: 'Log out success!' });
})


router.get('/loggedin', (req, res) => req.isAuthenticated() ? res.status(200).json(req.user) : res.status(403).json({ message: 'Sesión caducada' }))


module.exports = router
