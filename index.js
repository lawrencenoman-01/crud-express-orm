const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./routes/index.js')
const PORT = 8080

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
})