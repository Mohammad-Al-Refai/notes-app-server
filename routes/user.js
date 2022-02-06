const express = require('express')
const { createToken, verifyToken } = require('../auth/jwt')
const { getNotes } = require('../db/db-notes-repo')
const { addUser, findAccount, findUserName } = require('../db/db-user-repo')
const { checkRegisterBody } = require('../middleware/body-checker')
const {
  checkHeader,
  checkHeaderForToken,
} = require('../middleware/header-checker')
const { ResponseFactory } = require('../middleware/responseFactory')
const UserModule = require('../modules/UserModule')
const { USER_IS_NOT_FOUND, USER_NAME_IS_EXIST } = require('../util/Constants')

const User = express.Router()

// register
User.post('/user/register', checkHeader, checkRegisterBody, (req, res) => {
  const { userName, pin } = req.body
  addUser(new UserModule(userName, pin), (result, id) => {
    console.log(result, id)
    if (result) {
      ResponseFactory.success(res, {
        token: createToken({ userName, id }),
        userName: userName,
      })
    } else {
      ResponseFactory.fall(res, USER_NAME_IS_EXIST)
    }
  })
})

// login
User.post('/user/login', checkHeader, checkRegisterBody, (req, res) => {
  const { userName, pin } = req.body
  findAccount(userName, pin, (result) => {
    if (Object.keys(result).length === 0) {
      ResponseFactory.fall(res, USER_IS_NOT_FOUND)
    } else {
      findUserName(userName, (result) => {
        ResponseFactory.success(res, {
          token: createToken({ userName: result.userName, id: result._id }),
          userName: userName,
        })
      })
    }
  })
})

// get user data
User.get('/user/dashboard', checkHeaderForToken, (req, res) => {
  const { id, userName } = verifyToken(req.headers.token)
  getNotes(id, (result) => {
    ResponseFactory.success(res, {
      userName: userName,
      notes: result,
      length: result.length - 1,
      id: id,
    })
  })
})

module.exports = User
