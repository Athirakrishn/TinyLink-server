require ('dotenv').config()
const express = require ('express')
const cors = require('cors')
const router = require('./routing/router')
require('./db/connection')

const server = express()


server.use(cors()) 
server.use(express.json())
server.use(router)


const PORT = 3000


server.listen(PORT,()=>{
  console.log(`tinylink at PORT ${PORT},and waiting for clientrequest!!!`);
  
})
server.get('/',(req,res)=>{
 res.status(200).send("SERVER STARTED")
})

