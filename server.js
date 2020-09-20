const express = require('express')
const app = express()

app.use(express.json())

require('./src')(app)

app.listen(3000, () => {
  console.log('Server started on port 3000!')
})
