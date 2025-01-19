const router= require("express").Router()
const User=require("../models/user")
const { authenticateToken } = require("./userAuth")

//add book to cart
 router.put("/add-to-cart", authenticateToken, async(req,res)=>{
    try{
        const {bookid, id}=req.headers;
        const userData= await User.findById(id)
        const isBookinCart=userData.cart.includes(bookid)
        if(isBookinCart){
            return res.json({
                status:"success",
                message:"Book is already in cart",
            })
        }
        await User.findByIdAndUpdate(id,{$push: {cart: bookid},
        })
        return res.json({
            status:"success",
            message:"Book added to cart",
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Server Error"})
    }
 })
 

 ///book remove from cart

 router.put("/remove-from-cart", authenticateToken, async(req,res)=>{
    try{
        
        const {bookid,id}= req.headers;
       
        await User.findByIdAndUpdate(id,{$pull: {cart: bookid},
        })
        return res.json({
            status:"success",
            message:"Book removed cart",
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Server Error"})
    }
 })

// get cart of a particular person

router.get("/user-cart", authenticateToken, async(req,res)=>{

    try{
        const {id}= req.headers;
        userData= await User.findById(id).populate("cart")
        const cart=userData.cart.reverse()
        return res.json({
            status:"success",
            data:cart,
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({message:"error occoured"})
    }
})

module.exports= router;