const userSchema = require("../schema/userSchema");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const imagesPath = "./uploads/userPics/" + req.params.id;
  
      if (!fs.existsSync(imagesPath)) {
        fs.mkdirSync(imagesPath, { recursive: true });
      }
  
      cb(null, imagesPath);
    },
    filename: (req, file, cb) => {
      const profilePicFilename = "profilePic.jpg"; // Use a consistent filename
      cb(null, profilePicFilename);
    },
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 }, // Limit file size to 10MB
  }).single("profilePic");


exports.updateUser = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    } else {
      try {
        const { _id, about } = req.body;
        const profilePic = req.file ? "/" + req.file.path : ""; // Check if a file was uploaded

        const user = await userSchema.findOneAndUpdate(
          { _id: _id },
          {
            $set: {
              profilePic: "http://localhost:5000"+profilePic,
              about: about,
            },
          },
          { new: true }
        );

        res.status(200).json({
          success: true,
          user,
          message: "User updated successfully!",
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    }
  });
};

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

    const user = await userSchema.findOne({ emailId });
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
else
    res.status(200).json({
        success: true,
        user: "user",
        user
    })
}

//get All users
exports.allUsers = async (req, res) => {
console.log(req.body)
    const userList = await userSchema.find({ _id: { $ne: req.body.id } });
  
    if (!userList || userList.length === 0) {
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
exports.updateconnectionsUser = async (req, res) => {
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
