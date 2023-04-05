const userSchema = require("../schema/userSchema");

// >> Register Admin
exports.createUser = async (req, res) => {
    try {
        const {
            userName,
            emailId,
            password,
            _id
        } = req.body;

        const user = await userSchema.create({
            userName,
            emailId,
            password,
            _id
        })
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// >> Login Admin
exports.userLogin = async (req, res) => {
    const { emailId, password } = req.body;

    const user = await userSchema.findOne({ emailId }).select("+password");
    console.log(user)
    if (!user) {
        res.status(401).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        res.status(401).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    res.status(200).json({
        success: true,
        user: "user",
        user
    })
}

//get All users
exports.allUsers = async (req, res) => {

    const userList = await userSchema.find({  })
    console.log(userList)
    if (!userList) {
        res.status(401).json({
            success: false,
            message: "No users found"
        })
    }

   
    res.status(200).json({
        success: true,
        user: "user",
        userList
    })
   
}
exports.getUserbyID = async (req, res) => {

    const user = await userSchema.findOne({ _id:req.params.id })
    console.log(user)
    if (!user) {
        res.status(401).json({
            success: false,
            message: "No users found"
        })
    }

   
    res.status(200).json({
        success: true,
        user: "user",
        user
    })
   
}
//update user
exports.updateUser = async (req, res) => {
    const {
        connections,
        conversations
    } = req.body;

    const user = userSchema.findByIdAndUpdate(req.params.id, req.body).then((res1)=>{

        res.status(200).json({
            success: true,
            message: "User Updated Successfully!",
            user
        })
    })
    .catch((reason)=>{
        res.status(401).json({
            success: false,
            message: "User Not Found!",
        
        })
    }) 
    
        
    
      
    
}
