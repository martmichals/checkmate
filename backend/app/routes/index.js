const gameRoutes = require('./game_routes.js')
// const moveRoutes = require('./move_routes.js')

const version = '1.0.0'

module.exports = function (app, db) {
  gameRoutes(app, db)

  app.get('/api', (req, res) => {
    res.status(200)
    res.json({
      'api-version': version
    })
  })
}
