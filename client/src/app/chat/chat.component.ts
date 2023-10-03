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
    
    let value = event.target.value.trim();
    this.message = '';
    this.currConv={"conversationId": this.conversation._id,
    "reciverId":this.conversation.members.reciverId,
    "senderId":this.service.currUser._id,
    "text":value,
  }
    if (value.length < 1) return false;
    
    this.service.addMessage(this.currConv).subscribe((data:any)=>{
      console.log(data)
      this.socket.emit('save-message', `Message - Sent by: ${this.service.currUser._id}`);
      this.ngOnInit();
    })
   
    
    console.log(this.conversation)
  }

  emojiClicked(event) {
    this.message += event.emoji.native;
  }
  getAllMessages()
  {
    this.service.getMessages(this.conversation._id).subscribe((data:any)=>{
      console.log(data)
      this.messageList=data.message
    })
  }

  getNewMessages()
  {
    this.socket.on('new-message', () => {
      this.getAllMessages();
    });
  }
}
