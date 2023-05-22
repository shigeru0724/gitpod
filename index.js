const express = require('express')
const fs = require('fs');
const request = require('request');

const app = express()

const REST_HOST = '127.0.0.1:8089'
const MACAROON_PATH = '/home/gitpod/.tapd/data/regtest/admin.macaroon'

let options = {
  url: `https://${REST_HOST}/v1/taproot-assets/assets/groups`,
  // Work-around for self-signed certificates.
  rejectUnauthorized: false,
  json: true,
  headers: {
    'Grpc-Metadata-macaroon': fs.readFileSync(MACAROON_PATH).toString('hex'),
  },
}

app.get('/', function (req, res) {
  request.get(options, function(error, response, body) {
    if(error) {
      console.log(error)
      return res.send(error)
    }

    if(body) {
      console.log(body)
      return res.send(body)
    }
  });
})

app.listen(3000, console.log("Server is running on 3000 port."))