import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatTooltip } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/firebase-auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatError,
    MatFormField,
    MatIcon,
    MatLabel,
    MatCard,
    MatInput,
    MatTooltip,
    MatProgressBar,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NgClass,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isLoading: boolean = false;
  password: string = '';
  name: string = '';
  nameIsValid: boolean = false;
  email: string = '';
  emailExists: boolean = false;
  emailIsValid: boolean = false;
  passwordIsValid: boolean = false;
  isName: boolean = false;
  isEmail: boolean = false;
  isPassword: boolean = false;
  isSubmitted: boolean = false;

  constructor(
    private authservice: AuthService,
    private router: Router
  ) { }


  onSubmit(name: string, email: string, password: string) {
    this.isSubmitted = true;
    this.checkEmailExists(name, email, password);
  }

  /****************  Checks if the email to register already exists, if yes , error message occurs  ******/
  async checkEmailExists(name: string, email: string, password: string): Promise<void> {
    try {
      const signInMethods = await this.authservice.checkEmailExistence(name, email);
      if (signInMethods.length > 0) {
        this.emailExists = true;
      } else {
        this.register(email, password, name);
        this.emailExists = false;
      }
    } catch (error) {
      console.error('Fehler beim Überprüfen der E-Mail:', error);
    } finally {
      this.isLoading = false;
    }
  }

  /****************  Registers the user to firebase with password, mail and name   **************************/
  async register(email: string, password: string, name: string): Promise<void> {
    try {
      this.isLoading = true;
      await this.authservice.registerUser(email, password);
      await this.authservice.saveUser(name);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.emailExists = true;
      console.error('Fehler beim Registrieren', error);
      this.isLoading = false;
    } finally {
      this.isLoading = false;
    }
  }

  /*******************  sets the validation of the name to the input   *************************/
  nameValidation() {
    const patternOfName = /^(?=.*[a-zA-Z\u00C0-\u017F])[a-zA-Z\u00C0-\u017F\s]{4,}$/.test(
      this.name.trim()
    );
    this.nameIsValid = patternOfName;
    if (this.nameIsValid) {
      this.isName = true;
    } else {
      this.isName = false;
    }
  }

  /*******************  sets the validation of the email to the input   *************************/
  mailValidation() {
    const patternOfMail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(this.email);
    this.emailIsValid = patternOfMail;
    if (this.emailIsValid) {
      this.isEmail = true;
    } else {
      this.isEmail = false;
    }
  }

  /*******************  sets the validation of the password to the input   *************************/
  passwordValidation() {
    const minLength = 6; // at least 6 characters
    const hasNumber = /\d/.test(this.password); // at least one number
    const hasUppercase = /[A-Z]/.test(this.password); //at least one uppercase
    const hasLowercase = /[a-z]/.test(this.password); // at least one lowercase
    this.passwordIsValid =
      this.password.length >= minLength && hasNumber && hasUppercase && hasLowercase;
    if (this.passwordIsValid) {
      this.isPassword = true;
    } else {
      this.isPassword = false;
    }
  }


}
