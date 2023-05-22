const express = require('express')
const bodyParser = require('body-parser')

const app = express()

var jsonParser = bodyParser.json()


app.use('/api/taro', jsonParser, require('./routes/taro'));

app.listen(3000, console.log("Server is running on 3000 port."))