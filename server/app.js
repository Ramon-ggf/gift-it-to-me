require('dotenv').config()

// Database
require('./configs/mongoose.config')

// Debugger
require('./configs/debugger.config')

// App
const express = require('express')
const app = express()
const userLocal = require('./configs/local.user.config')

// Configs
require('./configs/cors.config')(app)
require('./configs/middleware.config')(app)
require('./configs/passport.config')(app)


// Routes index
require('./routes')(app)

app.use(userLocal)

module.exports = app
