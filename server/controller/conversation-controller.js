const Conversation = require("../schema/Conversation");


exports.newConversation = async (request, response)=>{
    
        const senderId = request.body.senderId;
        const reciverId = request.body.reciverId;

       const exist=  await Conversation.findOne({ members: {$all: [reciverId, senderId ] }})
        if(exist) {
            response.status(401).json({
                    success: false,
                    message: "Conversation Already exist"
                })
            
        
            }         
        const newConversation = new Conversation({
            members: [senderId, reciverId],
            timestamps:Date.now()
        })

       // newConversation.save();
        const converstion=await newConversation.save();
       // console.log(response)
        response.status(200).json({
            success: true,
            user: "user",
            converstion
        })
    

}

exports.getConversation =async(request, response) =>{
    try {

  //      const senderId = request.body.senderId;
//        const reciverId = request.body.reciverId;

        let conversation = await Conversation.find({})
        return response.status(200).json(conversation);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}