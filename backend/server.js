// Server
const express = require('express')

// App setup
const app = express()
const port = 8000

// Body parsing
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// Database
const secrets = require('./app/secrets.js')
const MongoClient = require('mongodb').MongoClient
MongoClient.connect(secrets.url, { useUnifiedTopology: true }, (err, db) => {
  if (err) return console.log(err)
  require('./app/routes')(app, db)
  app.listen(port, () => { console.log('Listening on port', port) })
})
