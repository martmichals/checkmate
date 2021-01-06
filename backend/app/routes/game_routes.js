module.exports = function (app, db) {
  app.post('/api/game', async (req, res) => {
    // Request execution
    const fenCheck = checkFen(req.body.fen)
    if (fenCheck === '') {
      // Gather data for insertion
      const database = db.db('games')
      const collection = database.collection('chessgames')
      const doc = {
        initialState: req.body.fen,
        currentState: req.body.fen,
        isFinished: false,
        timeCreated: new Date(),
        moves: []
      }

      // Insert, handling errors on the way
      try {
        const result = await collection.insertOne(doc)
        res.status(200)
        res.json({
          id: result.ops[0]._id
        })
      } catch (err) {
        res.status(400)
        res.json({
          error: 'Unable to upload the game to database'
        })
      }
    } else {
      res.status(400)
      res.json({
        error: fenCheck
      })
    }
  })

  app.delete('/api/game', async (req, res) => {
    // Request execution
    if (req.body.id) {
      // Gather data for deletion
      const mongodb = require('mongodb')
      const collection = db.db('games').collection('chessgames')

      // Delete the document from the database
      try {
        const query = { _id: new mongodb.ObjectId(req.body.id) }
        const result = await collection.deleteOne(query)
        if (result.deletedCount === 0) throw new Error('Nothing deleted')
        res.status(200)
        res.json({})
      } catch (err) {
        res.status(400)
        res.json({
          error: 'there is no game with the passed id'
        })
      }
    } else {
      res.status(400)
      res.json({
        error: 'id parameter is not well defined in the request'
      })
    }
  })

  // TODO : Add a method to get the game state
}

function checkFen (fen) {
  if (fen) {
    const { Chess } = require('chess.js')
    const chess = new Chess()

    const validationObj = chess.validate_fen(fen)
    if (!validationObj.valid) return validationObj.error

    const game = new Chess(fen)
    if (game.game_over()) return 'fen represents a game that is already completed'
    return ''
  } else return 'fen parameter not well defined in the request'
}
