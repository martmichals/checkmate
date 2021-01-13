module.exports = function (app, db) {
  app.post('/api/move', async (req, res) => {
    // Request execution
    if ('id' in req.body && 'from' in req.body && 'to' in req.body && 'promotion' in req.body) {
      // Gather data for move addition
      let result
      const mongodb = require('mongodb')
      const collection = db.db('games').collection('chessgames')

      // Get the relevant document
      try {
        const query = { _id: new mongodb.ObjectId(req.body.id) }
        result = await collection.findOne(query)
        if (!result) throw new Error('No document found')
      } catch (err) {
        res.status(400)
        res.json({
          error: 'failed to find a game with that id'
        })
        return
      }

      // Validate the passed move, try to execute
      const newFen = executeMove(req.body, result.currentState)
      if (newFen) {
        result.moves.push({
          from: req.body.from,
          to: req.body.to,
          promotion: req.body.promotion
        })
        result.currentState = newFen

        // Update the document
        try {
          // Variables for datatbase access
          const query = { _id: new mongodb.ObjectId(req.body.id) }
          const newValues = { $set: { moves: result.moves, currentState: result.currentState } }
          const updateResult = await collection.updateOne(query, newValues)

          // Validate that only one document was edited
          if (updateResult.result.nModified !== 1) throw new Error('Failed to update game')

          res.status(200)
          res.json({})
        } catch (err) {
          res.status(400)
          res.json({
            error: 'was unable to update the game'
          })
        }
      } else {
        res.status(400)
        res.json({
          error: 'the move passed was not valid'
        })
      }
    } else {
      res.status(400)
      res.json({
        error: 'missing a required parameter in the request, one of: [id, from, to, promotion]'
      })
    }
  })

  app.get('/api/move-random', (req, res) => {
    // Get the relevant game
    // Errors on missing/invalid id
    // Generate a random move with chess.js
    // Return
  })

  app.get('/api/move-ai', (req, res) => {
    // Request execution

    // TODO: Make a native C++ addon with an ABI to implement this part
  })
}

/*
 * Try to execute a move, return '' on error, or the current state FEN
 * string in the case of success
 */
function executeMove (moveObj, currFen) {
  const { Chess } = require('chess.js')
  const chess = new Chess(currFen)

  if (chess.move(moveObj) !== null) {
    return chess.fen()
  } else {
    return null
  }
}
