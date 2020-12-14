const express = require('express');
const bodyParser = require('body-parser')

const router = require('./routes');

const app = express()
const port = 3000

app.use(bodyParser.json())

app.use(router);

app.listen(port, () => {
  console.log(`Key Picker API listening at http://localhost:${port}`)
})