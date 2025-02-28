const express=require("express")
const app = express()
require("dotenv").config()
require("./connections/conn")
const user=require("./routes/user")
const book=require("./routes/book")
const favourite=require("./routes/favourite")
const cart=require("./routes/cart")
const order=require("./routes/order")
const home=require("./routes/home")
const payment = require("./routes/payment");
const author = require("./routes/author");
const cors=require("cors")
const path = require('path');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true }))


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Handle requests by serving index.html for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.use("/user",user)
app.use("/book",book)
app.use("/favourite",favourite)
app.use("/cart",cart)
app.use("/order",order)
app.use("/home",home )
app.use("/payment", payment);
app.use("/author", author);


// API endpoint
app.use('/api/products', async (req, res) => {
  const response = await axios.get('https://fakestoreapi.com/products');
  res.send(response.data);
});

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(PORT, () => {
  console.log(`Server is running on: http://${HOST}:${PORT}`);
});