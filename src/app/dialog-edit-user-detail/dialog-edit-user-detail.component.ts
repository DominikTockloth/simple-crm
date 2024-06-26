import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatProgressBar } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-dialog-edit-user-detail',
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
    NgIf
  ],
  templateUrl: './dialog-edit-user-detail.component.html',
  styleUrl: './dialog-edit-user-detail.component.scss'
})

export class DialogEditUserDetailComponent {
  isLoading = false;
  user: User = new User();
  userId: string | any;
  colId: string | any;
  constructor(
    public dialogRef: MatDialogRef<DialogEditUserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userservice: UserService) {
  }


  onNoClick() {
    this.dialogRef.close();
  }

  /*******************  Updates user data with edited values   ***********************/
  saveUser() {
    this.isLoading = true;
    this.userservice.loadUser(this.userId).then(() => {
      this.userservice.user = new User(this.userservice.user);
      this.userservice.user.firstName = this.user.firstName;
      this.userservice.user.lastName = this.user.lastName;
      this.userservice.user.email = this.user.email;
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
