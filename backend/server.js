// Imports
const express = require('express')
const MongoClient = require('mongodb').MongoClient

const app = express()
const port = 8000
app.listen(port, () => { console.log('Listening on port', port) })

// Set up body parsing
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

require('./app/routes')(app, {})
