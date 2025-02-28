const router=require("express").Router()
const User = require("../models/user")
const {authenticateToken}  =require("./userAuth")

//add to favourite

router.put("/add-to-favourite", authenticateToken, async(req,res)=>{
    try{
        const {bookid, id}= req.headers;
        const userData= await User.findById(id)

        const isBookFavourite= userData.favourites.includes(bookid)
        if(isBookFavourite){
            return res.status(200).json({message:"Book is already on favourite"})

        }
        await User.findByIdAndUpdate(id,{ $push:{favourites:bookid} })
        return res.status(200).json({message:"book added to favourate"})
    }catch(err){
       return res.status(500).json({message:"server ma error aayo hai"})
    }
})


//remove from favourite


router.put("/remove-from-favourite", authenticateToken, async(req,res)=>{
    try{
        const {bookid, id}= req.headers;
        const userData= await User.findById(id)

        const isBookFavourite= userData.favourites.includes(bookid)
        if(isBookFavourite){

            await User.findByIdAndUpdate(id,{ $pull:{favourites:bookid} })
        }
        return res.status(200).json({message:"book removed from favourate"})
    }catch(err){
       return res.status(500).json({message:"server ma error aayo hai"})
    }
})

//get favourite book of a particular person

router.get("/user-favourite", authenticateToken, async(req,res)=>{

    try{
        const {id}= req.headers;
        userData= await User.findById(id).populate("favourites")
        const favouriteBooks=userData.favourites
        return res.json({
            status:"success",
            data:favouriteBooks,
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({message:"error occoured"})
    }
})

module.exports=router;