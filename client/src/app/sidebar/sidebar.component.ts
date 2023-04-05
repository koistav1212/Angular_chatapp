import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { services } from '../services/services';

import {MatTabsModule} from '@angular/material/tabs';
import { AngularFireAuth } from '@angular/fire/auth';
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


  ngOnInit() {
    
  this.services.getCurrUser();
    this.getAllUsers()
    this.getAllConversation();
  }
  getAllUsers(){
    this.services.getUsers().subscribe((res:any)=>{
      console.log(res)
      this.allUsers=res.userList
    })  
  }
  getAllConversation(){
    this.services.getAllConversation().subscribe((res:any)=>{
      console.log(res)
      if(res)
      this.conversations=res.userList
    })  
  }
  connect(userId:any){
    console.log(this.services.currUser)
    let prvConv=[]
     prvConv=this.services.currUser.conversations;
    let prvConnect=[]
    prvConnect=this.services.currUser.connections;
    this.services.newConversation({reciverId:userId,senderId:this.services.currUser._id}).subscribe((res:any)=>{
      console.log(res)
      prvConv.push(res.converstion._id)
      prvConnect.push(userId)
      this.services.userUpdate({conversations:prvConv,connections:prvConnect},this.services.currUser._id).subscribe((res:any)=>{
        console.log(res)
      })
    })
  }
}
