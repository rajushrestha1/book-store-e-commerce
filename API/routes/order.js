const router=require("express").Router()
const {authenticateToken}  =require("./userAuth")
const Book = require("../models/book")
const Order = require("../models/order")
const User= require("../models/user")

// place order

router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        console.log("Request Body:", req.body); // Log the request body

        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataFromDb = await newOrder.save();
            console.log("Order saved:", orderDataFromDb);

            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDb._id }
            });

            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id }
            });
        }

        return res.json({
            status: "success",
            message: "Order placed successfully",
        });

    } catch (err) {
        console.log("err:", err); // Log the actual error
        return res.status(500).json({ message: "Internal Server Error "  });
    }
});


// get order history of a particular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        if (!id) {
            return res.status(400).json({ message: "Missing user ID" });
        }

        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" }
        });

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User Data:", userData);

        if (!userData.orders || userData.orders.length === 0) {
            return res.json({ status: "success", data: [] });
        }

        return res.json({ status: "success", data: [...userData.orders].reverse() });

    } catch (err) {
        console.error("Server Error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});


//get all orders
router.get("/get-all-order",authenticateToken, async(req,res)=>{
    try{

        const userData= await order.find().populate({
            path:"book",
           
        })
    
        .populate({
            path:"book",
        })
        .sort({createdAt: -1})
        return res.json({
            status:"success",
            data:"userData",
        })
    }catch(err){
        console.log("err")
        return res.status(500).json({message:"server error"})
    }
})

//update order admin
router.put("/update-status/:id",authenticateToken, async(req,res)=>{
    try{
        const {id}=req.params;
        await Order.findByIdAndUpdate(id,{status:req.body.status})
        return res.json({
            status:"success",
            data:"ststus updated succesfully",
        })
    }catch(err){
        console.log("err")
        return res.status(500).json({message:"server error"})
    }
})

module.exports=router;