import { Component } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';


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
    NgIf
  ],
  templateUrl: './dialog-edit-user-address.component.html',
  styleUrl: './dialog-edit-user-address.component.scss'
})

export class DialogEditUserAddressComponent {
  isLoading = false;
  user: User = new User();
  userId:string | any;
  constructor(public dialogRef: MatDialogRef<DialogEditUserAddressComponent>) {

  }

  onNoClick() {
    this.dialogRef.close();
  }

  saveUser() {

  }

}