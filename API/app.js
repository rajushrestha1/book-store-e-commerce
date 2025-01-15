const express = require('express')
const app = express()
require("dotenv").config()
require("./connections/conn")
const user=require("./routes/user")

app.use(express.json());
app.use(express.urlencoded({extended: true }))


app.use("/user",user)

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(process.env.PORT, () =>{
  console.log(`server started at port  $(process.env.PORT)`)
})