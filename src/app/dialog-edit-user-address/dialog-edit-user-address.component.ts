import { Component } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-dialog-edit-user-address',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatIcon,
    MatLabel,
    MatInput,
    MatFormField,
    MatProgressBar,
    FormsModule,
    NgIf,
  ],
  templateUrl: './dialog-edit-user-address.component.html',
  styleUrl: './dialog-edit-user-address.component.scss'
})

export class DialogEditUserAddressComponent {
  isLoading = false;
  user: User = new User();
  userId!: string;
  constructor(
    public dialogRef: MatDialogRef<DialogEditUserAddressComponent>,
    private userservice: UserService) {
  }

  onNoClick() {
    this.dialogRef.close();
  }


  /*********************  Updates the user with changed values to database  ************************/
  saveUser() {
    this.isLoading = true;
    this.userservice.loadUser(this.userId).then(() => {
      this.userservice.user = new User(this.userservice.user);
      this.userservice.user.street = this.user.street;
      this.userservice.user.zipCode = this.user.zipCode;
      this.userservice.user.city = this.user.city;
      this.userservice
        .updateUser(this.userId, this.userservice.user)
        .then(() => {
          this.userservice.user = new User(this.userservice.user);
          this.isLoading = false;
          this.dialogRef.close();
        })
        .catch(error => {
          console.error("Error updating user:", error);
          this.isLoading = false;
        });
    });
  }


}
