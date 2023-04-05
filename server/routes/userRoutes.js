const { userLogin, createUser, allUsers,updateUser,getUserbyID } = require("../controller/user-controller");

let route= require("express").Router();
route.post("/user-login",userLogin);
route.post("/addUsers", createUser);
route.get("/geAlltUsers", allUsers);

route.get("/getUserbyID/:id", getUserbyID);
route.put("/updateUserbyID/:id", updateUser);
module.exports = route;