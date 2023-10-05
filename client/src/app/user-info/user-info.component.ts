import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
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
