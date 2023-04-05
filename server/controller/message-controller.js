const Conversation = require("../schema/Conversation");
const Message = require("../schema/Message");

exports.newMessage = async (request, response) => {
    try {
        const newMessage = new Message(request.body);
        
        const conversation = await Conversation.findOne({ _id: request.body.conversationId })
        console.log(conversation);
        const prvMsg=conversation.message;
        prvMsg.push(request.body)
        await Conversation.findByIdAndUpdate(request.body.conversationId,{message:prvMsg})
        return response.status(200).json("Message has been sent successfully");
    } catch (error) {
        return response.status(500).json(error.message);
    }
}


exports.getMessages = async (request, response) => {
    try {

        const messages = await Message.find({ conversationId: request.params.id }).exec();
        //console.log(conversationId);
        //console.log(messages);
        return response.status(200).json(messages);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}