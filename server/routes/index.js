module.exports = app => {

    app.use('/api/auth', require('./auth.routes.js'))
    app.use('/api/petitions', require('./petitions.routes.js'))
    app.use('/api/centers', require('./center.routes.js'))
    app.use('/api/profiles', require('./profile.routes.js'))
}