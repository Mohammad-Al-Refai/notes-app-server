const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config()


function createToken(payload){
    return jsonwebtoken.sign(payload,process.env.JWT_KEY) // create new token
}
function verifyToken(token){
   try {
    return jsonwebtoken.verify(token,process.env.JWT_KEY)
   } catch (error) {
    return {}
   } //to confirm if token is valid
 }


 module.exports={createToken,verifyToken}