const { newConversation, getConversation } = require("../controller/conversation-controller");
const { newMessage, getMessages } = require("../controller/message-controller");
let route= require("express").Router();


route.post("/conversation/add", newConversation);
route.post("/conversation/get", getConversation);

route.post("/message/add", newMessage);
route.get("/message/get/:id", getMessages);

module.exports = route;