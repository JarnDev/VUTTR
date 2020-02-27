const toolRoutes = require('./tools-route')
const userRoutes = require('./users-route')
module.exports = (app) => {
    app.use('/tools', toolRoutes)
    app.use('/user', userRoutes)
}