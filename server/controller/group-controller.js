const Group = require("../schema/groups");
 
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


exports.grpMsg = async (request, response) => {
    try {
          
        const group = await Group.findOne({ _id: request.body.grpid })
        if(group)
       {// console.log(conversation);
        let prvMsg=[]
        if(group)
         prvMsg=group.message;
        prvMsg.push(request.body);
        prvMsg.sort((a, b) => b.timestamps - a.timestamps);

        await group.findByIdAndUpdate(request.body.grpid,{message:prvMsg})
        return response.status(200).json(prvMsg);}
        else{
            
        return response.status(500).json("Conv Not found");
        }
    } catch (error) {
        return response.status(500).json(error.message);
    }
}


exports.getMessages = async (request, response) => {
    try {

        const messages = await Group.findOne({ _id: request.params.id });
        //console.log(conversationId);
        //console.log(messages);
        return response.status(200).json(messages);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}
exports.addMember =async (req,res)=>{

    try {
        const group = await Group.findOne({ _id: request.body.grpid })
        if(group)
       {// console.log(conversation);
        let prvMem=[]
        if(group)
         prvMem=group.members;
        prvMem.push(request.body.members);

        await group.findByIdAndUpdate(request.body.grpid,{message:prvMem})
        return response.status(200).json(prvMem);}
        else{
            
        return response.status(500).json("Group Not found");
        }
    }
    catch(error){

    }
}

exports.removeMember = async (req, res) => {
    try {
        const groupId = req.body.grpid;
        const memberIdToRemove = req.body.memid;

        const group = await Group.findOne({ _id: groupId });
        
        if (group) {
            const currentMembers = group.members;
            
            // Find the index of the member to remove in the members array
            const indexToRemove = currentMembers.indexOf(memberIdToRemove);
            
            // If the member is found, remove them
            if (indexToRemove !== -1) {
                currentMembers.splice(indexToRemove, 1);
                
                // Update the group with the updated members list
                await Group.findByIdAndUpdate(groupId, { members: currentMembers });
                
                return res.status(200).json({ message: 'Member removed successfully' });
            } else {
                return res.status(404).json({ message: 'Member not found in the group' });
            }
        } else {
            return res.status(500).json({ message: 'Group not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
 