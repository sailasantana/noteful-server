require('dotenv').config()
const express = require('express')
const logger = require('./winston-logger')
const store = require('./noteful-store')
const {NODE_ENV} = require('./config')
const { route } = require('./app')
const NoteService = require('./service-object-notes/note-service')

const notesRouter = express.Router()
//const bodyParser = express.json()

noteRouter.route("/note/:noteId")
.get((req,res) => {
    const {nodeId} = req.params
    const note = store.notes.find(n => n.id == noteId)

    if(!note){
        logger.error(`Note does not exist - recheck ID`)
        return res.status(404).send('Note not found!')
    }
    res.json(note)
})
.delete((req, res) => {
    const {nodeId} = req.params
    const note = store.notes.find(n => n.id == noteId)
    const index = store.notes.findIndex(n => n.id == noteId)

    if(index === -1){
        logger.error(`note id does not exist`)
        return res.status(404)
        .send(`Unable to delete non-existent note!`)
    }
    //splice remove the bookmark at the specified index
    store.notes.splice(index,1)
    logger.info(`Note successfuly deleted - ${store.notes[index].title}`)
    res.status(204).end()
    

})


//I didn't build anything for this - my logic was that this is not the 
//endpoint we're posting to
//notesRouter.route("/add-note")
//.

module.export = notesRouter