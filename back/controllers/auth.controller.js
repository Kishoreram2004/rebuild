import User from "../models/user.model.js";

export const signup =async (req, res)=>{
    try {
        const {username, fullname, password, confirmPassword} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error:"password doesnt match"})
        }

        const user = await User.findOne({username}) 

        if(user){
            res.status(400).json({error:"User already exist...."})
        }

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`

        const girlProfilePic = 'const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`'

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
            await newUser.save()

            res.status(201).json({
            _id:newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilePic: newUser.profilePic
            })

        }else{
            res.status(400).json({error:"invalid user  data"});

        }

    
    } catch (error) {
        console.log("error in signup controller", error.message);
        res.status(500).json({error:"Internal server error"})
    }
}

export const login = (req, res)=>{
    res.send("login controller")
}

export const logout = (res,req)=>{
    res.send("logout controller");
}
