import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  conversation={};
  hideMatIcon=false;
  @ViewChild('fabicon') fabIcon: ElementRef;
  constructor() { }

  ngOnInit(): void {
    console.log(this.conversation)
  }
  user=true;
  onConversationSelected(conversation){
    console.log(conversation)
    this.conversation = conversation;
    this.hideMatIcon=!this.hideMatIcon;

  }
  onChatBackClicked(event: string) {
    // Hide the chat component by setting conversation to null or whatever logic you have
    this.conversation = {}; // You should replace this with your own logic
    
    this.hideMatIcon=!this.hideMatIcon;
  }
}
