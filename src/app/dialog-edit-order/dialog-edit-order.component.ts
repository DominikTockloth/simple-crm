import { Component, Inject, OnInit } from '@angular/core';
import { MatCardContent } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatOption, MatSelect } from '@angular/material/select';
import { Product } from '../../models/product.class';
import { MatIcon } from '@angular/material/icon';
import { OrderService } from '../services/order.service';
import { Order } from '../../models/order.class';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-dialog-edit-order',
  standalone: true,
  imports: [
    MatProgressBar,
    MatFormField,
    MatFormFieldModule,
    MatLabel,
    MatSelect,
    MatOption,
    MatCardContent,
    MatDialogActions,
    MatDialogContent,
    MatIcon,
    MatInput,
    FormsModule,
    NgIf,
    NgFor
  ],
  templateUrl: './dialog-edit-order.component.html',
  styleUrl: './dialog-edit-order.component.scss'
})
export class DialogEditOrderComponent implements OnInit {
  orderId: string = '';
  order: Order = new Order()
  userId: string = '';
  isLoading: boolean = false;
  product = new Product();
  products: any = [] = [];
  productSelected: { name: string; price: string } | any;
  productName: any;
  currentProduct: any;

  constructor(
    public dialogRef: MatDialogRef<DialogEditOrderComponent>,
    public orderservice: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: Order,
  ) { }


  ngOnInit(): void {
    this.loadToInputs();
    this.selectCurrentProduct();
  }

  /***************  Loads the viewvalues of products to the dropdown list   *******************************************/
  loadToInputs() {
    this.productName = this.products.map((data: Product) => ({
      value: data.data.productName,
      viewValue: `${data.data.productName} - ${data.data.productPrice} €`, // Produktnamen und den Preis hinzufügen
      price: data.data.productPrice,
    }));

  }

  /****************  Displays the editing product , to of the dropdown list   *******************************************/
  selectCurrentProduct() {
    if (this.currentProduct) {
      this.productSelected = this.productName.find(
        (product: any) => product.value === this.currentProduct.data.product &&
          product.price === this.currentProduct.data.price
      );

      if (!this.productSelected) {
        this.productSelected = {
          name: this.currentProduct.data.product,
          price: this.currentProduct.data.price
        };
        this.productName.push(this.productSelected);
      }
    }
  }

  /**********************  Updates the edited order with the changed values to database   ********************************************/
  updateOrder(orderId: string) {
    this.isLoading = true;
    this.orderservice.loadOrder(orderId).then(() => {
      this.orderservice.order = new Order(this.orderservice.order);
      this.orderservice.order.amount = this.data.data.amount;
      this.orderservice.order.product = this.productSelected.value;
      this.orderservice.order.price = this.productSelected.price;
      this.orderservice.order.dateOfOrder = this.data.data.dateOfOrder;
      this.orderservice.order.userId = this.data.data.userId;
      this.orderservice
        .updateOrder(orderId, this.orderservice.order)
        .then(() => {
          this.orderservice.order = new Order(this.orderservice.order);
          this.isLoading = false;
          this.dialogRef.close();
        })
        .catch(error => {
          console.error("Error updating user:", error);
          this.isLoading = false;
        });
    });
  }
  
  /********************************   Checks for filled inputs   ***************************************************/
  isFormValid() {
    return this.product.productName && this.data.data.amount;
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
