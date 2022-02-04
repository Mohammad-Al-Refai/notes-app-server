const express = require('express')
const { verifyToken } = require('../auth/jwt')
const { addNote, updateNote, deleteNote, getNotes } = require('../db/db-notes-repo')
const { checkNoteBody, checkUpdateNoteBody } = require('../middleware/body-checker')
const {checkHeaderForToken} = require('../middleware/header-checker')
const { ResponseFactory } = require('../middleware/responseFactory')
const NoteModule = require('../modules/NoteModule')
const { NOTE_IS_CREATED, NOTE_IS_NOT_ADDED, NOTE_IS_UPDATED, NOTE_IS_NOT_UPDATED, NOTE_IS_DELETED, NOTE_IS_NOT_DELETED } = require('../util/Constants')

const Note = express.Router()

// add new note endpoint
Note.post('/note/add-new', checkHeaderForToken, checkNoteBody, (req, res) => {
  const { title, description } = req.body
  addNote(
    new NoteModule(verifyToken(req.headers.token).id, title, description),
    (result) => {
      if (result) {
        ResponseFactory.success(res, NOTE_IS_CREATED)
      } else {
        ResponseFactory.fall(res, NOTE_IS_NOT_ADDED)
      }
    },
  )
})

// update note endpoint
Note.post('/note/update', checkHeaderForToken, checkUpdateNoteBody, (req, res) => {
    const {id,title,description}=req.body
    updateNote(id,verifyToken(req.headers.token).id,title,description,(result)=>{
        if (result) {
            ResponseFactory.success(res, NOTE_IS_UPDATED)
          } else {
            ResponseFactory.fall(res, NOTE_IS_NOT_UPDATED)
          }
    })
})

// delete note endpoint
Note.delete('/note/delete/:id',checkHeaderForToken,(req,res)=>{
  const uid=verifyToken(req.headers.token).id
  const noteID=req.params.id
    deleteNote(noteID,uid,(result)=>{
      if(result){
        ResponseFactory.success(res,NOTE_IS_DELETED)
      }else{
        ResponseFactory.success(res,NOTE_IS_NOT_DELETED)
      }
    })
})

// get notes endpoint
Note.get('/note/get',checkHeaderForToken,(req,res)=>{
  const uid=verifyToken(req.headers.token).id
  getNotes(uid,(result)=>{
    ResponseFactory.success(res,result)
  })
})

module.exports = Note
