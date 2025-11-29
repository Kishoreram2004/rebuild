export const signup =async (req, res)=>{
    try {
        const {username, fullname, password, confirmPassword} = req.body;
        
    } catch (error) {
        
    }
}

export const login = (req, res)=>{
    res.send("login controller")
}

export const logout = (res,req)=>{
    res.send("logout controller");
}
