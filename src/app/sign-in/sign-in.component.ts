import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFabButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/firebase-auth.service';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { OrderService } from '../services/order.service';

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

export class SignInComponent {

  password: string = '';
  email: string = '';
  isLoading: boolean = false;
  errorMessage: boolean = false;

  constructor(
    private router: Router,
    public authservice: AuthService,
    public userservice: UserService,
    public productservice: ProductService,
    public orderservice: OrderService
  ) {

  }


  /*******************  Handles regular log in with password and email   ****************/
  async logIn(email: string, password: string) {
    this.isLoading = true;
    try {
      await this.authservice.loginUser(email, password);
      await this.userservice.userList();
      await this.productservice.productList();
      await this.orderservice.orderList();
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.errorMessage = true;
      this.isLoading = false;
      console.error('login fehlgeschlagen', error)
    }
  }

  /*********************  Handles guest log in with anonymous data   ***********************/
  async guestLogIn() {
    this.isLoading = true;
    try {
      await this.userservice.userList();
      await this.productservice.productList();
      await this.orderservice.orderList();
      await this.authservice.guestLogin();
      this.router.navigate(['/dashboard']);
    } catch (error) {
      this.isLoading = false;
      console.error('Gast-Login fehlgeschlagen', error);
    }

  }
}
