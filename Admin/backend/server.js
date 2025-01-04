const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

app.use(cors)
app.use(express.json)
//post method and get method
port = process.env.PORT

app.listen(port)
console.log(`Server is running on localhost:${port}`)



