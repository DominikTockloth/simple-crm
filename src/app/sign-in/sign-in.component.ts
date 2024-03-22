import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFabButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatError,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatFabButton,
    NgIf,
    RouterLink,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})

export class SignInComponent implements ErrorStateMatcher {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

  isUserLoggedIn = false;
  constructor(private router: Router) {

  }

  guestLogIn() {
    this.isUserLoggedIn = true;
    this.router.navigate(['dashboard']);
  }
}
