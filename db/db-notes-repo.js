const { ObjectId } = require('mongodb')
const { client, NOTES_COLLECTION } = require('./db-config') // require mongodb client
const { findUser } = require('./db-user-repo')
require('dotenv').config() // require .env file to access to private variables
const DB_NAME = process.env.DB_NAME

function addNote(note, callback) {
  findUser(note.uid, (result) => {
    if (Object.keys(result).length === 0) {
      callback(false)
    } else {
      client.then((db) => {
        db.db(DB_NAME)
          .collection(NOTES_COLLECTION)
          .insertOne({ ...note, createdAt: new Date() })
          .then((value) => {
            callback(value.insertedId ? true : false)
          })
      })
    }
  })
}

function updateNote(id, uid, title, description, callback) {
  findUser(uid, (result) => {
    console.log(result)
    if (Object.keys(result).length === 0) {
      callback(false)
    } else {
      client.then((db) => {
        db.db(DB_NAME)
          .collection(NOTES_COLLECTION)
          .updateOne(
            { uid: uid, _id: new ObjectId(id) },
            {
              $set: {
                title: title,
                description: description,
                updatedAt: new Date(),
              },
            },
          )
          .then((value) => {
            callback(value.modifiedCount >= 1 ? true : false)
          })
      })
    }
  })
}

function deleteNote(id, uid, callback) {
  findUser(uid, (result) => {
    if (Object.keys(result).length === 0) {
      callback(false)
    } else {
      client.then((db) => {
        db.db(DB_NAME)
          .collection(NOTES_COLLECTION)
          .deleteOne({ uid: uid, _id: new ObjectId(id) })
          .then((value) => {
            callback(value.deletedCount >= 1 ? true : false)
          })
      })
    }
  })
}

function getNotes(uid, callback) {
  client.then((db) => {
    db.db(DB_NAME)
      .collection(NOTES_COLLECTION)
      .find({ uid: uid })
      .toArray((err, result) => {
        if (err) {
          callback([])
        } else {
          callback(result)
        }
      })
  })
}
module.exports = { addNote, updateNote, deleteNote, getNotes }
