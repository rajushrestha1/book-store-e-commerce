const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
//signUP

router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "user length should be greater than 3" });
    }

    const existingUsername = await User.findOne({ username: username });

    if (existingUsername) {
      return res.status(400).json({ message: "user name already exist" });
    }

    const existingEmail = await User.findOne({ email: email });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exist" });
    }

    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "Password must be gretaer or equal to 6" });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      email: email,
      password: hashPass,
      address: address,
    });
    await newUser.save();
    return res.status(200).json({ message: "signup succesfully" });
  } catch (err) {
    res.status(500).json({ message: "server error  " + err });
  }
});

//sign
router.post("/sign-in", async (req, res) => {


    try{
        const {email, password}=req.body;

        const existingUser= await User.findOne({email:email});
        if(!existingUser){
          return  res.status(400).json({message: "user not found"})
        }

         isMatch= bcrypt.compare(password, existingUser.password);

         if (isMatch) {
            const authClaims = [
              { name: existingUser.username },
              { role: existingUser.role },
            ];
            const token = jwt.sign({ authClaims }, "bookstore123", {
                expiresIn: "30d",
                });

              return  res.status(200).json({id:existingUser._id, role:existingUser.role, token:token})
            
         }
            else{

               return res.status(400).json({message:"invalid credential"})

            }

    

   
  } catch (err) {
   return res.status(500).json({ message: "server error" });
  }
});

//get user info

// Add validation for user ID
router.get("/user-info", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    if (!id) return res.status(400).json({ message: "User ID required" });

    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//update address

router.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const { id } = req.header;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address: address });
    return res.status(200).json({ message: "Address updated succesfully" });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
