import { Component } from '@angular/core';
import { Product } from '../../models/product.class';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatProgressBar } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dialog-delete-product',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatProgressBar,
    NgIf,
  ],
  templateUrl: './dialog-delete-product.component.html',
  styleUrl: './dialog-delete-product.component.scss'
})

export class DialogDeleteProductComponent {
  product: Product = new Product();
  productid: string | any;
  products: [] = [];
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteProductComponent>,
    private productservice: ProductService,
    private router: Router,
  ) { }


  /******************* Deletes the specific product   *****************************/
  deleteProduct(productid: string) {
    if (productid) {
      this.isLoading = true;
      this.productservice.loadProduct(this.productid).then(() => {
        this.productservice.deleteProduct(productid)
          .then(() => {
            this.productservice.product = new Product(this.product);
            this.isLoading = false;
            this.dialogRef.close();
          })
          .catch(error => {
            console.error("Error deleting product:", error);
            this.isLoading = false;
          });
      });
    } else {
      console.error("Product ID is empty.");
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }


}
