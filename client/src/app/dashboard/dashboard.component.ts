import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { services } from '../services/services';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  conversation={};conversations=[];
  hideMatIcon=false;
  @ViewChild('fabicon') fabIcon: ElementRef;
  constructor( public modalService: NgbModal,private services:services) { }

  @ViewChild(SidebarComponent) sidebarComponent: SidebarComponent;
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
    this.sidebarComponent.getAllConversation();
    this.sidebarComponent.getAllGroups();
  }
  
  
  
  openModal(userlist: any) {
    this.modalService.open(userlist, { ariaLabelledBy: 'modal-basic-title', windowClass: 'after-submit-popup',centered:true }).result.then((result) => {
  
    }, (res:any) => {
      if (res) {
     
      }
    });
  }
}
