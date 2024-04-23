import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewChild, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule, MatDatepicker } from '@angular/material/datepicker';
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
    MatError,
    MatFormFieldModule,
    MatIcon,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule,
    NgIf],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class DialogAddUserComponent {
  firestore: Firestore = inject(Firestore);
  user: User = new User();
  birthDate: Date | null = null;
  isLoading = false;


  @ViewChild('datepicker') datepicker!: MatDatepicker<any>;
  constructor(
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    private userservice: UserService,

  ) { }

  ngAfterViewInit() {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
    this.datepicker.startAt = minDate;
  }

  /******************************* Checks for filled inputs   *******************************************/
  isFormValid() {
    return this.user.firstName && this.user.lastName && this.user.email && this.user.birthDate !== null && this.user.city && this.user.zipCode;
  }

  /*********************************  Saves the added user with the formatted birthdate   *******************/
  saveUser() {
    this.isLoading = true;
    let formattedDate: Date | null = null;
    if (this.birthDate !== null) {
      formattedDate = this.birthDate;
    }
    if (formattedDate !== null) {
      this.user.birthDate = formattedDate;
    }
    this.userservice.saveUser(this.user);
    console.log('current user', this.user);
    this.isLoading = false;
    this.dialogRef.close();
  }

  /**************************  Clears the inputs of dialog  **********************************************************/
  clearValuesOfDialog() {
    this.user.email = '';
    this.user.city = ''
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.street = '';
    this.user.zipCode = '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

