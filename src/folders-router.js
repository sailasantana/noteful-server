require('dotenv').config()
const express = require('express')
const uuid = require('uuid/v4')
const logger = require('./winston-logger')
const store = require('./store')
const { NODE_ENV } = require('./noteful-store')

const foldersRouter = express.Router()
const bodyParser = express.json()

foldersRouter.route('/folder/:folderId')
    .get((req,res) => {
        const {folderId} = req.params
        const folder = store.folders.find(f => f.id == folderId)
        const notesforFolder = store.notes.filter(note => note.folderId === folderId)

        if(!folder) {
            logger.error(`Folder not found - recheck ID`)
            return res
            .status(404)
            .send('Folder does not exist!')
        }
        res.json(notesforFolder)

    })
    .delete((req, res) => {
    
        const {folderId} = req.params
        const index = store.notes.findIndex(note => note.folderId === folderId)
        const note = store.notes.find(note => note.folderid == folderId)
    
        if(index === -1){
          logger.error(`Note ID doesn't exist!`)
          return res.status(404)
          .send(`Note ID doesn't exist!`)
        }
        //splice removes the note at the const index
        store.notes.splice(index, 1)
    
        logger.info(`Note sucessfully deleted - ${store.notes[index].title}`)
        res.status(204).end()
      })
      .post(bodyParser, (req, res) => {
          console.log(req.body)
          for( const field of [ 'title', 'folderId', 'content']){
              if(!req.body[field]){
                logger.error(`${field} required!`)
                return res.status(400).send(`${field} required!`)
              }
          }
        const title = req.body.title
        const folderId = req.body.folderId
        const content = req.body.content

        const newNote = {title, folderId, content , id: uuid()}
        store.notes.push(newNote)
        logger.info(`Note successfully added - ${newNote.title}`)
        res.status(201).location(`http://localhost:8000/folder/${newNote.folderId}`)
        .json(newNote)
      })
