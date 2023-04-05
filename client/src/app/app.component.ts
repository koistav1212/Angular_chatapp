import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  conversation;

user=false;
  onConversationSelected(conversation){
    this.conversation = conversation;
  }
}
