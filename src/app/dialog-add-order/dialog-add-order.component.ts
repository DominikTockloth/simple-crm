import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { FormControl, FormsModule } from '@angular/forms';
import { MatDatepicker, MatDatepickerActions, MatDatepickerInputEvent, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { Order } from '../../models/order.class';
import { MatInput } from '@angular/material/input';
import { MatProgressBar } from '@angular/material/progress-bar';
import { NgFor, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Product } from '../../models/product.class';
import { provideNativeDateAdapter } from '@angular/material/core';
import { OrderService } from '../services/order.service';


interface ProductName {
  value: string;
  viewValue: string;
  price: number;
  currentProductId: number;
}

@Component({
  selector: 'app-dialog-add-order',
  standalone: true,
  imports: [
    MatDialogActions,
    MatOption,
    MatIcon,
    MatProgressBar,
    MatFormFieldModule,
    MatSelect,
    MatLabel,
    MatInput,
    MatDialogContent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerActions,
    FormsModule,
    NgIf,
    NgFor

  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-add-order.component.html',
  styleUrl: './dialog-add-order.component.scss'
})

export class DialogAddOrderComponent implements OnInit {
  data: any;
  order = new Order();
  product = new Product();
  isLoading: boolean = false;
  products: any = [] = [];
  productSelected: { name: string; price: string } | any;
  userId: string | any;
  orderId: string | any;
  productName: any;
  minDate: string = new Date().toISOString().split('T')[0];


  constructor(
    public dialogRef: MatDialogRef<DialogAddOrderComponent>,
    private orderservice: OrderService
  ) { }



  ngOnInit(): void {
    this.loadToInputs();
  }

  /**
   * This renders the view value to the product dropdown list
   */
  loadToInputs() {
    this.productName = this.products.map((data: Product) => ({
      value: data.data.productName,
      viewValue: `${data.data.productName} - ${data.data.productPrice} €`, // Produktnamen und den Preis hinzufügen
      price: data.data.productPrice,
    }));
  }

  /**
   * this function is for adding an order to the specific user
   */
  async saveOrder() {
    this.isLoading = true;
    try {
      this.order.price = this.productSelected.price;
      this.order.product = this.productSelected.name;
      this.order.userId = this.userId;
      await this.orderservice.saveOrder(this.order);
    } catch (error) {

      console.error('Fehler beim Speichern der Bestellung:', error);
    }
    this.isLoading = false;
    this.dialogRef.close();
  }

  /***************************************   Checks if inputs are filled    **********************************************************************/
  isFormValid() {
    return this.productSelected && this.order.amount;
  }
}
