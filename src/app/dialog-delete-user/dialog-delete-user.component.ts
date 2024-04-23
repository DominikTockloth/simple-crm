import { Component } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';
import { UserService } from '../services/user.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-delete-user',
  standalone: true,
  imports: [
    MatIcon,
    MatProgressBar,
    MatDialogActions,
    MatDialogContent,
    NgIf
  ],
  templateUrl: './dialog-delete-user.component.html',
  styleUrl: './dialog-delete-user.component.scss'
})

export class DialogDeleteUserComponent {
  isLoading = false;
  user: User = new User();
  userId!: string;
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteUserComponent>,
    private userservice: UserService,
    private router: Router) {
  }

  /****************  Deletes specific user **********************************/
  deleteUser() {
    this.isLoading = true;
    this.userservice.loadUser(this.userId).then(() => {
      this.userservice.deleteUser(this.userId)
        .then(() => {
          this.userservice.user = new User(this.userservice.user);
          this.isLoading = false;
          this.dialogRef.close();
          this.router.navigate(['user']);
        })
        .catch(error => {
          console.error("Error deleting user:", error);
          this.isLoading = false;

        });
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
