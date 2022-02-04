const { ObjectId } = require('mongodb')
const { ResponseFactory } = require('./responseFactory')
const { isNameValid, isPINValid } = require('../util/validation')
const { ID_IS_NOT_INVALID, TITLE_IS_INVALID, DESCRIPTION_IS_INVALID, USER_NAME_IS_INVALID, PIN_IS_INVALID } = require('../util/Constants')

// middleware for add note and update
function checkNoteBody(req, res, next) {
  const { body } = req
  // check uid if exist in the body
  if (body.title === '' || body.title === undefined) {
    ResponseFactory.fall(res, 'title is invalid')
    // check description if exist in the body
  } else if (body.description === '' || body.description === undefined) {
    ResponseFactory.fall(res, 'description is invalid')
  } else {
    next()
  }
}

// middleware for add note and update
function checkUpdateNoteBody(req, res, next) {
  const { body } = req
  // check uid if exist in the body
  if (
    body.id === '' ||
    body.id === undefined ||
    ObjectId.isValid(body.id) === false
  ) {
    ResponseFactory.fall(res, ID_IS_NOT_INVALID)
  }
  // check title of note if exist in the body
  if (body.title === '' || body.title === undefined) {
    ResponseFactory.fall(res, TITLE_IS_INVALID)
    // check description if exist in the body
  } else if (body.description === '' || body.description === undefined) {
    ResponseFactory.fall(res, DESCRIPTION_IS_INVALID)
  } else {
    next()
  }
}

// middleware for register
function checkRegisterBody(req, res, next) {
  const { userName, pin } = req.body
  // check name if exist in the body
  if (userName === '' || userName === undefined || !isNameValid(userName)) {
    ResponseFactory.fall(res, USER_NAME_IS_INVALID)
    // check pin of note if exist in the body
  } else if (pin === '' || pin === undefined || !isPINValid(pin)) {
    ResponseFactory.fall(res, PIN_IS_INVALID)
  } else {
    next()
  }
}
module.exports = { checkNoteBody, checkUpdateNoteBody, checkRegisterBody }
