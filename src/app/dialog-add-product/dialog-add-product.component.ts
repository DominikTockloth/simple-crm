import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.class';
import { ProductService } from '../services/product.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-dialog-add-product',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatDialogContent,
    MatDialogActions,
    MatIcon,
    MatProgressBarModule,
    FormsModule,
    MatLabel,
    NgIf
  ],
  templateUrl: './dialog-add-product.component.html',
  styleUrl: './dialog-add-product.component.scss'
})


export class DialogAddProductComponent {
  isLoading = false;
  product: Product = new Product();

  constructor(
    public dialogRef: MatDialogRef<DialogAddProductComponent>,
    private productservice: ProductService) { }

   
  saveProduct() {
    this.isLoading = true;
    this.productservice.saveProduct(this.product);
    console.log('current product', this.product);
    this.isLoading = false;
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
