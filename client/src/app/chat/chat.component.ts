import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { services } from '../services/services';
import * as io from "socket.io-client";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  @ViewChild('testMsg') testMsgTextarea !: ElementRef;
  emojiPickerVisible;
  message = '';
  constructor(public service:services,public modalService: NgbModal) {
    
 //   this.socket = io('http://localhost:5000',{withCredentials: true, transports: ["websocket"]});
  }
  socket = io.connect('http://localhost:5000', {withCredentials: true, transports: ["websocket"]});
currUser:any={}

  async ngOnInit(): Promise<void> {
    
    console.log("ChatConv",this.conversation)
    this.messageList=this.conversation.message
    this.getNewMessages();
    this.getAllUsers();
    (await this.service.getCurrUser()).subscribe((res:any)=>{
      this.currUser=res.user;})

      
  }

  submitMessage(event) {
    if(this.conversation.grpName==null)
    {
    let value = event.target.value.trim();
    this.message = '';
    this.currConv={"conversationId": this.conversation._id,
    "reciverId":this.conversation.members.reciverId,
    "senderId":this.service.getstoreduser()._id,
    "text":value,
    "timestamps":Date.now()
  }
    if (value.length < 1) return false;
    
    this.service.addMessage(this.currConv).subscribe((data:any)=>{
      console.log(data)
      this.socket.emit('save-message', `Message - Sent by: ${this.service.getstoreduser()._id}`);
      this.ngOnInit();
    })
  }
  else{
    let value = event.target.value.trim();
    this.message = '';
    this.currConv={"grpId": this.conversation._id,
   
    "senderId":this.service.getstoreduser()._id,
    
    "senderName":this.service.getstoreduser().userName,
    "text":value,
    "timestamps":Date.now()
  }
    if (value.length < 1) return false;
    
    this.service.addMsgToGroup(this.conversation._id,this.currConv).subscribe((data:any)=>{
      
      this.socket.emit('save-message', `Message - Sent by: ${this.service.getstoreduser()._id}`);
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
  allUsers=[]
  getAllUsers(){
     this.service.getallUsers({}).subscribe((res:any)=>{

      this.allUsers=res.userList
    })  
  }
  formatTimestamp(messages: any): string {
    if(messages){
    const today = new Date();
    const messageDate = new Date(parseInt(messages));
  
    // Check if the message date is the same day as today
    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      // Today: Display time
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (
      messageDate.getDate() === today.getDate() - 1 &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      // Yesterday: Display time
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      // Other days: Display full date with time
      return messageDate.toLocaleString(); // This includes both date and time
    }}
    return "";
  }
  
  getUserProfilePic(userId: string): string {
    const user = this.allUsers.find(u => u._id === userId);
   
    return user ? user.profilePic : '../../../../assets/background/user_icon.png';
  }
  getUserName(userId: string): string {
    const user = this.allUsers.find(u => u._id === userId);
    return user ? user.userName : 'New User';
  }
  
  openModal(userlist: any) {
    this.modalService.open(userlist, { ariaLabelledBy: 'modal-basic-title', windowClass: 'after-submit-popup',centered:true }).result.then((result) => {
  
    }, (res:any) => {
      if (res) {
     
      }
    });
  }
}
