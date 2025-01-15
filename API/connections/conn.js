const mongoose = require("mongoose")

const conn = async ()=>{
    try{
        await mongoose.connect(`${process.env.URI}`)
        console.log("Database Connected Succesfully")
    }catch(err){
        console.log(error)
    }
}
conn();