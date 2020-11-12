//gets all notes and folders at home page path
//posts new notes or folders to home page path
require('dotenv').config()
const express = require('express')
const uuid = require('uuid/v4')
const logger = require('./winston-logger')
const store = require('./store')
const { NODE_ENV } = require('./noteful-store')

const mainRouter = express.Router()
const bodyParser = express.json()

mainRouter.route('/')
  .get((req, res) => {
    res.json(store)
  })
  //post for a folder
  .post(bodyParser, (req, res) => {
    console.log(req.body)
    for (const field of ['title']) {
      if (!req.body[field]){
        logger.error(`${field} required!`)
        return res.status(400).send(`${field} required!`)
      }
    }

    const title = req.body.title



    const newFolder = {title , id: uuid()}
    bookmarks.push(newBookmark)
    logger.info(`Folder successfully added - ${newFolder.title} , ${newFolder.id}`)
        res.status(201)
        .location(`http://localhost:8000`)
        .json(newFolder)


  })
  //can I have a second POST here for new notes?