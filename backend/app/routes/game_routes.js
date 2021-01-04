module.exports = function (app, db) {
  app.post('/api/create-game', (req, res) => {
    console.log('Creating a new game object')
    console.log(req.body)
  })

  app.post('/api/make-move', (req, res) => {
    console.log('Getting the game with ID', 'UNDEFINED')
  })

  app.get('/api/generate-move', (req, res) => {
    console.log('Generating a move for the game')
  })

  app.delete('api/delete-game', (req, res) => {
    console.log('Deleting a game')
  })
}
