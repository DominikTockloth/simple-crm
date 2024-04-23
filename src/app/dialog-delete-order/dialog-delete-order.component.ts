import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatProgressBar } from '@angular/material/progress-bar';
import { OrderService } from '../services/order.service';
import { Order } from '../../models/order.class';

@Component({
  selector: 'app-dialog-delete-order',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatProgressBar,
    NgIf,
  ],
  templateUrl: './dialog-delete-order.component.html',
  styleUrl: './dialog-delete-order.component.scss'
})

export class DialogDeleteOrderComponent {
  order: Order = new Order();
  data: any;
  isLoading: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteOrderComponent>,
    public orderservice: OrderService
  ) { }


  /******************   Deletes the specific order  *****************************/
  deleteOrder(orderId:string) {
    if (orderId) {
      this.isLoading = true;
      this.orderservice.loadOrder(orderId).then(() => {
        this.orderservice.deleteOrder(orderId)
          .then(() => {
            this.orderservice.order = new Order(this.order);
            this.isLoading = false;
            this.dialogRef.close();
          })
          .catch(error => {
            console.error("Error deleting order:", error);
            this.isLoading = false;
          });
      });
    } else {
      console.error("order ID is empty.");
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
