require("dotenv").config() // require .env file
const mongo=require("mongodb").MongoClient //import mongodb client
const client=mongo.connect(process.env.DB_URL) // connect to the db
const USERS_COLLECTION="users"
const NOTES_COLLECTION="items"

client.then((db)=>{
    console.log("MongoDB is connected")
  
}).catch((error)=>{
    console.log("MongoDB is not connected",error)
})

module.exports={client,USERS_COLLECTION,NOTES_COLLECTION}