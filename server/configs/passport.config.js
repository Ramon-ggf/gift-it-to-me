const session = require("express-session")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const flash = require("connect-flash")

const User = require('./../models/User.model')

module.exports = app => {

    app.use(session({
        secret: "finalApp20",
        resave: true,
        saveUninitialized: true
    }))

    passport.serializeUser((user, next) => next(null, user._id))
    passport.deserializeUser((id, next) => {
        User.findById(id)
            .then(theUser => next(null, theUser))
            .catch(err => next(err))
    })

    app.use(flash())

    passport.use(new LocalStrategy({

        usernameField: 'email',
        passReqToCallback: true

    }, (req, username, password, next) => {
            
        User.findOne({ email: username })
            .then(user => {
                if (!user) {
                    return next(null, false, { message: "Wrong email or user not registered." })
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    return next(null, false, { message: "Wrong password" })
                }
                return next(null, user)
            })
            .catch(err => res.status(500).json(err))
    }))

    app.use(passport.initialize())
    app.use(passport.session())
}