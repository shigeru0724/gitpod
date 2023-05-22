const express = require('express');
const router = express.Router();
const fs = require('fs');

const { sendRequest } = require('../utils/request');

const REST_HOST = '127.0.0.1:8089'
const MACAROON_PATH = '/home/gitpod/.tapd/data/regtest/admin.macaroon'

router.get('/assets', async (req, res) => {
  try {
     let options = {
      url: `https://${REST_HOST}/v1/taproot-assets/assets`,
      // Work-around for self-signed certificates.
      rejectUnauthorized: false,
      json: true,
      headers: {
        'Grpc-Metadata-macaroon': fs.readFileSync(MACAROON_PATH).toString('hex'),
      },
    }

    sendRequest("get", options, res);
  } catch (err) {
    res.json({err})
  }
});

router.post('/assets', async (req, res) => {
  try {
    let requestBody = {
      asset: req.body.asset, // <MintAsset>
      enable_emission: req.body.enable_emission, // <bool>
    };

    let options = {
      url: `https://${REST_HOST}/v1/taproot-assets/assets`,
      // Work-around for self-signed certificates.
      rejectUnauthorized: false,
      json: true,
      headers: {
        'Grpc-Metadata-macaroon': fs.readFileSync(MACAROON_PATH).toString('hex'),
      },
      form: JSON.stringify(requestBody),
    }

    sendRequest("post", options, res);
  } catch (err) {
    res.json({err})
  }
});

router.post('/assets/mint/finalize', async (req, res) => {
  try {
    let requestBody = {
    };

    let options = {
      url: `https://${REST_HOST}/v1/taproot-assets/assets/mint/finalize`,
      // Work-around for self-signed certificates.
      rejectUnauthorized: false,
      json: true,
      headers: {
        'Grpc-Metadata-macaroon': fs.readFileSync(MACAROON_PATH).toString('hex'),
      },
      form: JSON.stringify(requestBody),
    }

    sendRequest("post", options, res);
  } catch (err) {
    res.json({err})
  }
});

module.exports = router;