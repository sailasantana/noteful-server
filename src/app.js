require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const {NODE_ENV, API_TOKEN} = require('./config')
const errorHandler = require('./error-handler')
const app = express()
const logger = require('./winston-logger')
const notesRouter = require('./notes-router')
const foldersRouter = require('./folders-router')

function validateBearerToken(req, res, next) {
  const authToken = req.get('Authorization')
  logger.error(`Unauthorized request to path: ${req.path}`)
  console.log(authToken)
  console.log(API_TOKEN)

  if (!authToken || authToken.split(' ')[1] !== API_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }
  console.log('abc')

  next()
}



const morganOption = ((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
})

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(errorHandler)
app.use(validateBearerToken)

app.use('/',notesRouter)
app.use('/',foldersRouter)

app.get('/', (req, res) => {
  res.send('Hello, Noteful!')

  })

app.get(('/',notes), (req, res) => {
    res.send(store.notes)
  
    })  

app.get(('/',folders), (req, res) => {
    res.send(store.folders)
    
    
  })    
app.use(errorHandler)
    

module.exports = app