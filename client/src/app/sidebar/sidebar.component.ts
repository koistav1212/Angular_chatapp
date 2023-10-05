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
  params: any = {
      };
      
  imgUrl: string = '';
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
  this.params={
    _id:res.user._id,
    userName:res.user.userName,
    profilePic:res.user.profilePic,
    about:res.user.about}
  this.getAllUsers(res.user)
  this.getAllConversation();
  this.getAllGroups();
  if(res.user.profilePic.length>0)
   this.imgUrl=res.user.profilePic
else
this.imgUrl='https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png';
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
    })  
  }
  getAllGroups()
  {
    this.services.getGroups(this.services.currUser.rooms).subscribe((res:any)=>{
      
      if(res)
      this.conversations = [...this.conversations, ...res];
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
      this.services.updateUserconnections({conversations:prvConv,connections:senderprvConnect},this.services.currUser._id).subscribe((res:any)=>{
        console.log(res)
        
        
      this.services.updateUserconnections({conversations:prvConv,connections:senderprvConnect},userId).subscribe((res:any)=>{
        
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
    if(messages.length>0)
    {messages.sort((a: { timestamps: number; }, b: { timestamps: number; }) => b.timestamps - a.timestamps);

// Get the last message
return messages[0].text;}
return "";

  }
   formatTimestamp(messages: any): string {
    if(messages.length>0){
    messages.sort((a: { timestamps: number; }, b: { timestamps: number; }) => b.timestamps - a.timestamps);
    const today = new Date();
    const messageDate = new Date(parseInt(messages[0].timestamps));
  
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
  
  myGroups = [
    { name: 'Group 1' },
    { name: 'Group 2' },
    { name: 'Group 3' },
    // Add more groups as needed
  ];

 // Initialize params with user data

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.params.profilePic = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
      };
    }
  }

  submitStudent() {
    const formData: FormData = new FormData();
    formData.append('_id', this.params._id);
    if (this.params.profilePic) {
      formData.append('profilePic', this.params.profilePic);
    } else {
      formData.append('profilePic', '');
    }

  //  formData.append('profilePic', this.params.profilePic);
    formData.append('about', this.params.about);   
     formData.append('userName', this.params.userName);

    this.services.updateUser(formData, this.params._id).subscribe((data: any) => {
      console.log(data);
      this.services.setCurrUser(data);
    });
  }

}
