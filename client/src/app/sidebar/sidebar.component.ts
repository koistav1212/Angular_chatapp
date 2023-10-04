import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { services } from '../services/services';

import {MatTabsModule} from '@angular/material/tabs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() conversationClicked: EventEmitter<any> = new EventEmitter();
  searchText: string;
  conversations=[]
  allUsers=[]
  get filteredConversations() {
    return this.conversations.filter((conversation) => {
      return (
        conversation.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        conversation.latestMessage
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
      );
    });
  }

  get filteredUsers() {
    return this.allUsers.filter((conversation) => {
      return (
        conversation.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        conversation.latestMessage
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
      );
    });
  }

  constructor(private services:services,private afAuth:AngularFireAuth) {}


  async ngOnInit() {
 (await this.services.getCurrUser()).subscribe((res:any)=>{
  console.log(res)
  this.services.setCurrUser(res.user)
  
  this.getAllUsers()
  this.getAllConversation();
 })
    
  }
  getAllUsers(){
    this.services.getUsers().subscribe((res:any)=>{
      console.log(res)
      this.allUsers=res.userList
    })  
  }
  getAllConversation(){
    this.services.getAllConversation(this.services.currUser).subscribe((res:any)=>{
      
      if(res)
      this.conversations=res
      console.log(this.conversations)
    })  
  }
  connect(userId:any,userName:any,userPic:any){
    console.log(this.services.currUser)
    let prvConv=[]
    if(this.services.currUser.conversations)
     prvConv=this.services.currUser.conversations;
    let senderprvConnect=[]
    if(this.services.currUser.connections)
    senderprvConnect=this.services.currUser.connections;
    this.services.newConversation({reciverId:userId,senderId:this.services.currUser._id,reciverName:userName,reciverPic:userPic,senderName:this.services.currUser.userName
    ,senderPic:this.services.currUser.userName,timestamps:Date.now()}).subscribe((res:any)=>{
      console.log(res)
      prvConv.push(res.converstion._id)
      senderprvConnect.push(userId)
      this.services.userUpdate({conversations:prvConv,connections:senderprvConnect},this.services.currUser._id).subscribe((res:any)=>{
        console.log(res)
        
        
      this.services.userUpdate({conversations:prvConv,connections:senderprvConnect},userId).subscribe((res:any)=>{
        
  this.services.getCurrUser();
  this.getAllConversation();
      })
      })
    })
  }
}
