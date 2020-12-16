require('dotenv').config()

// Database
require('./configs/mongoose.config')

// Debugger
require('./configs/debugger.config')

// App
const express = require('express')
const app = express()

// Configs
require('./configs/cors.config')(app)
require('./configs/middleware.config')(app)
require('./configs/passport.config')(app)

const middlewares = require("./configs/middleware.config");
Object.keys(middlewares).forEach(key => app.use(middlewares[key]));

// Routes index
require('./routes')(app)

module.exports = app
