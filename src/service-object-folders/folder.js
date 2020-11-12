
require('dotenv').config()
const knex = require('knex')
const FolderService = require('./service-object-folder')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})


console.log(FolderService.getAll())