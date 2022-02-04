const { ObjectId } = require('mongodb')
const { client, USERS_COLLECTION } = require('./db-config') // require mongodb client
require('dotenv').config() // require .env file
const DB_NAME = process.env.DB_NAME

// check out if user is exist or not but if not will be created - this function register
function addUser(user, callback) {
  findUserName(user.userName, (result) => {
    if (Object.keys(result).length === 0) {
      client.then((db) => {
        db.db(DB_NAME)
          .collection(USERS_COLLECTION)
          .insertOne(user)
          .then((value) => {
            callback(value.insertedId ? true : false, value.insertedId)
          })
      })
    } else {
      callback(false)
    }
  })
}

// check out for user id in users collection
function findUser(id, callback) {
  client.then((db) => {
    db.db(DB_NAME)
      .collection(USERS_COLLECTION)
      .find({ _id: new ObjectId(id) })
      .toArray((err, result) => {
        console.log(result)
        callback(result.length === 0 ? {} : result[0])
      })
  })
}
// check out if user exist in users collection - this function for login
function findAccount(userName, pin, callback) {
  client.then((db) => {
    db.db(DB_NAME)
      .collection(USERS_COLLECTION)
      .find({ userName, pin })
      .toArray((err, result) => {
        console.log(result)
        callback(result.length === 0 ? {} : result[0])
      })
  })
}

// check out if userName exist in users collection
function findUserName(userName, callback) {
  client.then((db) => {
    db.db(DB_NAME)
      .collection(USERS_COLLECTION)
      .find({ userName })
      .toArray((err, result) => {
        console.log(result)
        callback(result.length === 0 ? {} : result[0])
      })
  })
}

module.exports = { addUser, findUser, findAccount ,findUserName}
