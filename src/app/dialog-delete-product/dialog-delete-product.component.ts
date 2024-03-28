import { Component, Inject } from '@angular/core';
import { Product } from '../../models/product.class';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatProgressBar } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dialog-delete-product',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatProgressBar,
    NgIf
  ],
  templateUrl: './dialog-delete-product.component.html',
  styleUrl: './dialog-delete-product.component.scss'
})
export class DialogDeleteProductComponent {
  product: Product = new Product();
  productId!: string;
  products:[] = [];
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteProductComponent>,
    private productservice: ProductService,
    private router: Router,
   ) {}


 
  deleteProduct() {
    this.isLoading = true;
    this.productservice.loadProduct(this.productId).then(() => {
      this.productservice.deleteProduct(this.productId)
        .then(() => {
          this.productservice.product = new Product(this.productservice.product);
          this.isLoading = false;
          this.dialogRef.close();
          this.router.navigate(['products']);
        })
        .catch(error => {
          console.error("Error deleting user:", error);
          this.isLoading = false;

        });
    });
  }
 
  onNoClick() {
    this.dialogRef.close();
  }


}
