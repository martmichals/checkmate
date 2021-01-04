const fenRoutes = require('./game_routes.js')

const version = '1.0.0'

module.exports = function (app, db) {
  fenRoutes(app, db)

  app.get('/api', (req, res) => {
    res.status(200)
    res.json({
      'api-version': version
    })
  })
}
