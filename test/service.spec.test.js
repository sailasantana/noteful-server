const NotefulService = require('../src/service-object-notes/note-service')
const knex = require('knex')

  describe(`Noteful service object`, function() {
  let db

  let test = [
         {
         title: 'First test post!',
         content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
         folderId : 'abd',
         modified: "2018-08-15T23:00:00.000Z",

       },
      {
        title: 'Second test post!',
       content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum.',
       folderId : 'abe',
       modified: "2018-08-15T23:00:00.000Z",
    }
     ]
    
    before(() => {
        db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
    })
    })

    before(() => db('noteful_notes').truncate())

    afterEach(() => db('noteful_notes').truncate())

    after(() => db.destroy())

    before(() => {
        return db
            .into('noteful_notes')
            .insert(test)
        })

     context(`Given 'noteful_notes' has data`, () => {
        before(() => {
          return db
            .into('noteful_notes')
            .insert(test)
        })
    
        it(`getAll() resolves all articles from 'noteful_notes' table`, () => {
          return NotefulService.getAll(db)
            .then(actual => {
              expect(actual).to.eql(test)
            })
        })
      })
     //context similar to describe
     context(`Given 'noteful_notes' has no data`, () => {
       it(`getAll() resolves an empty array`, () => {
        return NotefulService.getAll(db)
          .then(actual => {
            expect(actual).to.eql([])
          })
       })
       it(`insertNote() inserts an new and resolves the note with an 'id'`, () => {
          const newNote = {
           title: 'Test new title',
           content: 'Test new content',
           folderId: '1234',
           modified: new Date('2020-01-01T00:00:00.000Z'),
      }
      return NotefulService.insertNote(db, newNote)
          .then(actual => {
             expect(actual).to.eql({
               id: 1,
               folderId: newNote.folderId,
               title: newNote.title,
               content: newNote.content,
               modified: newNote.modified,
            })
           })
         })
     })

})
