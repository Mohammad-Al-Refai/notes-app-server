const express = require('express') //import express to create web application
const app = express()
const client=require("./db/db-config")
const cors=require("cors")
const body_parser = require('body-parser') // import body-parser to convert body of request to json
const morgan = require('morgan') //import morgan for log every request that coming to server
const Note = require('./routes/notes')
const User = require('./routes/user')
const { ResponseFactory } = require('./middleware/responseFactory')
const PORT=4000


app.use(cors())
app.use(body_parser.json()) // add body-parser to express
app.use(morgan("short")) // add moragn to express

app.use("/api",Note)
app.use("/api",User)
app.use("/",(req,res)=>{
    ResponseFactory.notFound(res,"not found")
})


app.listen(PORT,()=>{
    console.log("Server is running")
})