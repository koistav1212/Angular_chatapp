import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  conversation={};
  constructor() { }

  ngOnInit(): void {
    console.log(this.conversation)
  }
  user=true;
  onConversationSelected(conversation){
    console.log(conversation)
    this.conversation = conversation;
  }

}
