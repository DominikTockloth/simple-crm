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


  /***************  Saves the added product  ********************************/
  saveProduct() {
    this.isLoading = true;
    this.productservice.saveProduct(this.product);
    this.isLoading = false;
    this.dialogRef.close();
  }

  /*******************  This function is to round the decimals to 2  *************/
  restrictDecimalPlaces(event: any) {
    const inputValue = event.target.value;
    const parts = inputValue.split('.');
    if (parts.length > 1 && parts[1].length > 2) {
      const roundedValue = parseFloat(inputValue).toFixed(2);
      event.target.value = roundedValue;
    }
  }


  /****************************   Checks, if all inputs are filled and disables the save button   ************/
  isFormValid() {
    return this.product.productName && this.product.productPrice && this.product.typeOfOrder;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
