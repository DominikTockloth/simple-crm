import { CommonModule, NgFor } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogAddProductComponent } from '../dialog-add-product/dialog-add-product.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProductService } from '../services/product.service';
import { DialogDeleteProductComponent } from '../dialog-delete-product/dialog-delete-product.component';
import { Product } from '../../models/product.class';
import { collection, onSnapshot } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    MatCard,
    MatIcon,
    RouterLink,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})


export class ProductsComponent {
  products: any = [] = [];
  product: Product = new Product();
  productId: string | any;

  constructor(
    public dialog: MatDialog,
    private productservice: ProductService,
  ) { }

  
  productsFromService() {
    return this.productservice.products;
  }


  openDeleteDialog() {
    const dialog = this.dialog.open(DialogDeleteProductComponent);
    dialog.componentInstance.product = new Product(this.product);
    dialog.componentInstance.productId = this.productId;
  }


  openDialog(): void {
    this.dialog.open(DialogAddProductComponent, {});
  }


  /*
    openDeleteDialog( product:Product) {
      const dialog = this.dialog.open(DialogDeleteProductComponent, {
        data: {
          productId: product.id,
         product: product,
        }
      });
      
    }
  */
}
