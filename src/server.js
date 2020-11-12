const app = require('./app')

const { PORT } = require('./config')
//const store = require('./store')




app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})