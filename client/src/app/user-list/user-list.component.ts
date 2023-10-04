import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { services } from '../services/services';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

import {MatTabsModule} from '@angular/material/tabs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  
  constructor(private services:services,private afAuth:AngularFireAuth,private modalService :NgbModal) {}
  allUsers=[]
  
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  async ngOnInit() {
    (await this.services.getCurrUser()).subscribe((res:any)=>{
    
     
     this.getAllUsers(res.user)
    })
       
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [  ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'userName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
     }
  
  getAllUsers(data:any){
    console.log("userList",data)
    this.services.getUsers(data).subscribe((res:any)=>{
      console.log(" userList",res)
      this.allUsers=res.userList
    })  
  }
  closeModal(){
    this.modalService.dismissAll()
  }
  
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  createGrp()
  {
    
  }
}
