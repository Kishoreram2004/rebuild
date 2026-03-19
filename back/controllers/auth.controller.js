import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookies from "../utils/generateToken.js";
export const signup =async (req, res)=>{
    try {
        const {username, fullname, password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error:"password doesnt match"})
        }
        
        const user = await User.findOne({username}) 

        if(user){
            res.status(400).json({error:"User already exist...."})
        }

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`

        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname,
            username,
            password: hashPassword,
            gender,
            profilePic: gender === "male"? boyProfilePic: girlProfilePic,
        })

        if(newUser){
            await newUser.save() // store in mongoDb
            generateTokenAndSetCookies(newUser._id, res); // this will generate the jwt token.
            // this will be the response send back from the server once the request is successful
            res.status(201).json({ 
            _id:newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilePic: newUser.profilePic
            })

        }else{    // if there is any error in the newUser this will send the status of 400 and a eror message as invalid data to frontend 
             res.status(400).json({error:"invalid user  data"});
        }

    
    } catch (error) {
        console.log("error in signup controller", error.message);
        res.status(500).json({error:"Internal server error"})
    }
}

export const login = async (req, res)=>{
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});

        const isCorrectPassword = await bcrypt.compare(password, user?.password || "");

        if(!user || !isCorrectPassword){
            res.status(400).json({error:"invalid username or password"});
        }

        generateTokenAndSetCookies(user._id, res);
        res.status(200).json({
            _id:user.id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic
        }) 

    } catch (error) {
        console.log("error in login controller", error.message)
        //this .json will send the error message to the frontend  
        res.status(500).json({error: "Internal server error...."})
    } 

}

export const logout = (res,req)=>{  
    res.send("logout controller");
}
