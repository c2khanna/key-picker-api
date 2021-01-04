const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const router = require('./routes');

const app = express()
const port = 3000

app.use(bodyParser.json());

if(process.env.NODE_ENV === 'development') {
  app.use(cors());
} else {
  var whitelist = ['http://keypicker.s3-website.us-east-2.amazonaws.com'];
  
  var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
  
  app.use(cors(corsOptions));
}

app.use(router);

app.listen(port, () => {
  console.log(`Key Picker API listening at http://localhost:${port}`)
})