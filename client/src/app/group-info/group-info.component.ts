import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.scss']
})
export class GroupInfoComponent {
  @Input() conversation;
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
