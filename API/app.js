const express=require("express")
const app = express()
require("dotenv").config()
require("./connections/conn")
const user=require("./routes/user")
const book=require("./routes/book")
const favourite=require("./routes/favourite")
const cart=require("./routes/cart")
const order=require("./routes/order")
app.use(express.json());
app.use(express.urlencoded({extended: true }))


app.use("/user",user)
app.use("/book",book)
app.use("/favourite",favourite)
app.use("/cart",cart)
app.use("/order",order)
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(process.env.PORT, () =>{
  console.log(`server started at port  $(process.env.PORT)`)
})