const { verifyToken } = require('../auth/jwt')
const { ResponseFactory } = require('./responseFactory')

require('dotenv').config() // require .env file

//check out if apikey and token is exist and valid in request headers
function checkHeaderForToken(req, res, next) {
  const header = req.headers
  console.log(verifyToken(header.token))
  if (
    header.apikey !== process.env.API_KEY ||
    header.token === undefined ||
    verifyToken(header.token).id === undefined
  ) {
    ResponseFactory.unauthorized(res, 'Unauthorized')
  } else {
    next()
  }
}
//check out if apikey is exist and valid in request headers
function checkHeader(req, res, next) {
  const header = req.headers
  if (header.apikey !== process.env.API_KEY) {
    ResponseFactory.unauthorized(res, 'Unauthorized')
  } else {
    next()
  }
}
module.exports = { checkHeader, checkHeaderForToken }
