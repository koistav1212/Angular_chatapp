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
 
  this.services.setCurrUser(res.user)
  
  this.getAllUsers(res.user)
  this.getAllConversation();
 })
    
  }
  getAllUsers(data:any){
    console.log("sidebar",data)
    this.services.getUsers(data).subscribe((res:any)=>{
      console.log(" sidebar",res)
      this.allUsers=res.userList
    })  
  }
  getAllConversation(){
    this.services.getAllConversation(this.services.currUser).subscribe((res:any)=>{
      
      if(res)
      this.conversations=res
      console.log("sidebar",this.conversations)
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

  openModal()
  {
    console.log("open modal")
  }
  getlastMsg(messages:any)
  {
    messages.sort((a: { timestamps: number; }, b: { timestamps: number; }) => b.timestamps - a.timestamps);

// Get the last message
return messages[0].text;

  }
   formatTimestamp(timestamps: any): string {
    const today = new Date();
    const messageDate = new Date(parseInt(timestamps));
  
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
    }
  }
  
  myGroups = [
    { name: 'Group 1' },
    { name: 'Group 2' },
    { name: 'Group 3' },
    // Add more groups as needed
  ];

  editProfilePicture() {
    // Handle edit profile picture logic here
  }

  editName() {
    // Handle edit name logic here
  }

  editAboutMe() {
    // Handle edit about me logic here
  }

  editGroups() {
    // Handle edit groups logic here
  }
}
