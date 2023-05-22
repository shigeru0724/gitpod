const request = require('request');

const sendRequest = (method, options, res) => {
  request[method](options, function(error, response, body) {
    res.json(body ? body : error)
  });
}

module.exports = { sendRequest }