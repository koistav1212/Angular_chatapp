const Group = require("../schema/Group");


exports.newGroup = async (request, response)=>{
                
        const newConversation = new Conversation({
            members:request.body.members
            
            ,   grpName:request.body.grpName,
                grpPic:request.body.grpPic,
            timestamps:Date.now()
        })

       // newConversation.save();
        const converstion=await newConversation.save();
       // console.log(response)
        response.status(200).json({
            success: true,
            group: "group",
            converstion
        })
    

}

exports.getGroups =async(request, response) =>{
    try {

  //      const senderId = request.body.senderId;
//        const reciverId = request.body.reciverId;
        let groups = await Group.find({_id:{$all:request.body.rooms}})
       // console.log(conversation)
        return response.status(200).json(groups);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}