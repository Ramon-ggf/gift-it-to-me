module.exports = app => {


    app.use('/api/auth', require('./auth.routes.js'))
    app.use('/api/petitions', require('./petitions.routes.js'))
}