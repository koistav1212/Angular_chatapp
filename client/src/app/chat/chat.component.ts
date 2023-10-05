import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { services } from '../services/services';
import * as io from "socket.io-client";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @Input() conversation;currConv={};
  messageList=[]
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() backClicked: EventEmitter<string> = new EventEmitter();

  emojiPickerVisible;
  message = '';
  constructor(public service:services) {
    
 //   this.socket = io('http://localhost:5000',{withCredentials: true, transports: ["websocket"]});
  }
  socket = io.connect('http://localhost:5000', {withCredentials: true, transports: ["websocket"]});


  ngOnInit(): void {
    
   // console.log(this.conversation)
    this.messageList=this.conversation.message
    this.getNewMessages()
  }

  submitMessage(event) {
    if(this.conversation.grpName==null)
    {
    let value = event.target.value.trim();
    this.message = '';
    this.currConv={"conversationId": this.conversation._id,
    "reciverId":this.conversation.members.reciverId,
    "senderId":this.service.currUser._id,
    "text":value,
    "timestamps":Date.now()
  }
    if (value.length < 1) return false;
    
    this.service.addMessage(this.currConv).subscribe((data:any)=>{
      console.log(data)
      this.socket.emit('save-message', `Message - Sent by: ${this.service.currUser._id}`);
      this.ngOnInit();
    })
  }
  else{
    let value = event.target.value.trim();
    this.message = '';
    this.currConv={"grpId": this.conversation._id,
   
    "senderId":this.service.currUser._id,
    
    "senderName":this.service.currUser.userName,
    "text":value,
    "timestamps":Date.now()
  }
    if (value.length < 1) return false;
    
    this.service.addMsgToGroup(this.conversation._id,this.currConv).subscribe((data:any)=>{
      
      this.socket.emit('save-message', `Message - Sent by: ${this.service.currUser._id}`);
      this.ngOnInit();
    })

  }
    
  }

  emojiClicked(event) {
    this.message += event.emoji.native;
  }
  getAllMessages()
  { if(this.conversation.grpName==null){
    this.service.getMessages(this.conversation._id).subscribe((data:any)=>{
      
      this.messageList=data.message
    })}
    else{
      this.service.getGroupMessages(this.conversation._id).subscribe((data:any)=>{
        console.log("chat_get",data);
      this.messageList=data.message
      })
    }
  }

  getNewMessages()
  {
    this.socket.on('new-message', () => {
      this.getAllMessages();
    });
  }
  handleBackClick() {
    // Emit the "back" event
    this.backClicked.emit('back');
  }
}
