import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatCardActions } from '@angular/material/card';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Product } from '../../models/product.class';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-edit-product',
  standalone: true,
  imports: [
    MatCardActions,
    MatProgressBar,
    MatFormField,
    MatDialogContent,
    MatDialogActions,
    MatIcon,
    MatLabel,
    MatInput,
    MatFormField,
    MatProgressBar,
    FormsModule,
    NgIf,

  ],
  templateUrl: './dialog-edit-product.component.html',
  styleUrl: './dialog-edit-product.component.scss'
})
export class DialogEditProductComponent implements OnInit {
  products: any[] = [];
  productid: any;
  product: any;
  isLoading: boolean = false;

  constructor(
    private productservice: ProductService,
    public dialogRef: MatDialogRef<DialogEditProductComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Product,
  ) { }

  ngOnInit(): void {
    this.product = this.data.data;
    console.log(this.product);
  }

  /***********************  Updates the edited product to database with changed values   ******************/
  updateProduct(productid: string) {
    this.isLoading = true;
    this.productservice.loadProduct(this.productid).then(() => {
      this.productservice.product = new Product(this.productservice.product);
      this.productservice.product.productName = this.data.data.productName;
      this.productservice.product.productPrice = this.data.data.productPrice;
      this.productservice.product.typeOfOrder = this.data.data.typeOfOrder;
      this.productservice
        .updateProduct(this.productid, this.productservice.product)
        .then(() => {
          this.productservice.product = new Product(this.productservice.product);
          this.isLoading = false;
          this.dialogRef.close();
          this.router.navigate(['products']);
        })
        .catch(error => {
          console.error("Error updating user:", error);
          this.isLoading = false;
        });
    });

  }

  /*********************  Checking for filled inputs  *****************************************************/
  isFormValid(): boolean {
    return !!this.data.data.productName && !!this.data.data.productPrice && !!this.data.data.typeOfOrder;
  }

  onNoClick() {
    this.isFormValid();
    this.dialogRef.close();

  }
}
