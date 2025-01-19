const router=require("express").Router()
const {authenticateToken}  =require("./userAuth")
const Book = require("../models/book")
const Order = require("../models/order")


// place order

router.post("/place-order", authenticateToken, async(req,res)=>{
try{
    const {id}=req.headers;
    const{order}=req.body;
    for (const orderData of order){

        const newOrder= new Order({user:id, book:orderdata._id});
        const orderDataFromDb= await newOrder.save()
        //save order in user model

        await User.findByIdAndUpdate(id,{
            $push:{orders:orderDataFromDb._id}
        })

        //clearing cart

        
        await User.findByIdAndUpdate(id,{
            $pull:{cart:orderData._id}
        })

    
    }
    return res.hson({
        status:"success",
        message:"order placed succesfully",
    })

}catch(err){
    console.log("err")
    return res.status(500).json({message:"server error"})
}

})


// get order history of a particular user

router.get("/get-order-history",authenticateToken, async(req,res)=>{
    try{
        const {id}=req.headers;
        const userData= await User.findById(id).populate()({
            path:"order",
            data:{path:"book"},
        })
        const orderData= userData.orders.reverse();
        return res.json({
            status:"success",
            data:"orderData",
        })
    }catch(err){
        console.log("err")
        return res.status(500).json({message:"server error"})

    }
})

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