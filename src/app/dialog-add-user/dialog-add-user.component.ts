import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { NgIf } from '@angular/common';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [MatDialogActions,
    MatDialogContent,
    MatInputModule,
    MatFormFieldModule,
    MatIcon,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule,
    NgIf],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})


export class DialogAddUserComponent {
  firestore: Firestore = inject(Firestore);
  user: User = new User();
  birthDate: Date |any;
  isLoading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private userservice: UserService) { }

  saveUser() {
    this.isLoading = true;
    this.user.birthDate = this.birthDate.getTime();
    this.userservice.saveUser(this.user);
    console.log('current user', this.user);
    this.isLoading = false;
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clearValuesOfDialog() {
    this.user.email = '';
    this.user.city = ''
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.street = '';
    this.user.zipCode = '';
  }
}
