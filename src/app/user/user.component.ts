import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { DialogAddUserComponent } from './../dialog-add-user/dialog-add-user.component';
import { NgClass, NgFor } from '@angular/common';
import { UserService } from '../services/user.service';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltip,
    MatCardModule,
    DialogAddUserComponent,
    NgFor,
    NgClass,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})

export class UserComponent implements OnInit {
  userId!: string;
  users: [] = [];
  selectedUserSort: string = 'Name';
  sortedUsersFromInput: any[] = [];
  sortedUsers: any[] = [];
  inputValue: any;

  constructor(public dialog: MatDialog, private userservice: UserService) { }

  ngOnInit(): void {
    this.usersFromService();
  }

  /********************** Gets data for users from database   **************************************************************/
  usersFromService() {
    return this.userservice.users;
  }


  /*********************** This part is for sorting users by specific values on clicking the filter buttons   ***************/
  sortUsers() {
    switch (this.selectedUserSort) {
      case 'Firstname':
        this.sortByName();
        break;
      case 'Birthdate':
        this.sortByBirthdate();
        break;
      case 'City':
        this.sortByCity();
        break;
      default:
        this.sortedUsers = this.users;
        break;
    }
  }

  sortByName() {
    if (this.userservice.users.length > 1) {
      this.sortedUsers = this.userservice.users.sort((a: any, b: any) =>
        a.data.firstName.localeCompare(b.data.firstName)
      );
      this.sortedUsersFromInput = this.userservice.users.sort((a: any, b: any) =>
        a.data.firstName.localeCompare(b.data.firstName)
      );
    } else {
      this.sortedUsers = this.userservice.users;

    }
  }

  sortByBirthdate() {
    this.sortedUsers = this.userservice.users.sort((a: any, b: any) => a.data.birthDate - b.data.birthDate);
    this.sortedUsersFromInput = this.userservice.users.sort(
      (a: any, b: any) => b.data.birthDate - a.data.birthDate
    );
  }

  sortByCity() {
    this.sortedUsers = this.userservice.users.sort((a: any, b: any) =>
      a.data.city.localeCompare(b.data.city)
    );
    this.sortedUsersFromInput = this.userservice.users.sort((a: any, b: any) =>
      a.data.city.localeCompare(b.data.city)
    );
  }

  usersFromInput(): void {
    if (this.selectedUserSort === 'Firstname') {
      this.inputValuesForName();
    }
    else if (this.selectedUserSort === 'Birthdate') {
      this.inputValuesForBirthdate();
    } else if (this.selectedUserSort === 'City') {
      this.inputValuesForCity();
    }
  }

  /*******************  Filters the users by the search field of lower cases   **************************/
  inputValuesForName() {
    return (this.sortedUsersFromInput = this.userservice.users
      .filter(item =>
        item.data.firstName &&
        item.data.firstName.toLowerCase().startsWith(this.inputValue.toLowerCase())
      )
    );
  }

  inputValuesForBirthdate() {
    return (this.sortedUsersFromInput = this.userservice.users
      .filter(
        item => item.data.birthDate.toString().startsWith(this.inputValue.toLowerCase())
      ));
  }


  inputValuesForCity() {
    return (this.sortedUsersFromInput = this.userservice.users
      .filter(
        item =>
          item.data.city
            .toLowerCase()
            .includes(this.inputValue.toLowerCase())
      ));
  }

  /** Formates the date to xx. month year 
   * @param timestamp 
   * @returns - formatted user birthdate
   */
  formatDate(timestamp: any): string {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('de-DE');
  }

  openDialog(): void {
    this.dialog.open(DialogAddUserComponent, {});
  }
}
