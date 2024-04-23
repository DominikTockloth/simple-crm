import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { DialogEditProductComponent } from '../dialog-edit-product/dialog-edit-product.component';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    NgIf,
    MatCard,
    MatIcon,
    RouterLink,
    MatButtonModule,
    MatTooltipModule,
    NgClass,
    FormsModule

  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})


export class ProductsComponent {
  products: any = [] = [];
  product: Product = new Product();
  productid: string | any;
  selectedProductSort: string = 'Product Name';
  sortedProducts: any[] = [];
  sortedProductsFromInput: any[] = [];
  inputValue: any;
  data: any;
  item: any;


  constructor(
    public dialog: MatDialog,
    private productservice: ProductService,
  ) {
  }

  /**********************  Gets products data from database   *************************************************************/
  productsFromService() {
    return this.productservice.products;
  }

  /*********************  This part is for opening the delete and edit dialogs with the specific data of product  *******/
  openDeleteDialog(productId: string) {
    const dialog = this.dialog.open(DialogDeleteProductComponent, {
      data: {
        productId: productId,

      }
    });
    dialog.componentInstance.productid = productId;
  }

  openEditDialog(productId: string, data: Product) {
    const dialog = this.dialog.open(DialogEditProductComponent, {
      data: {
        data: data,
        productid: productId
      }
    });
    dialog.componentInstance.data.data = new Product(data.data);
    dialog.componentInstance.productid = productId;

  }

  /***********************  This part is for sorting the products by its name, price and type   ********************************/
  sortProducts() {
    switch (this.selectedProductSort) {
      case 'Product Name':
        this.sortByProductName();
        break;
      case 'Type':
        this.sortByType();
        break;
      default:
        this.sortedProducts = this.products;
        break;
    }
  }

  sortByProductName() {
    if (this.productservice.products.length > 1) {
      this.sortedProducts = this.productservice.products.sort((a: any, b: any) =>
        a.data.productName.localeCompare(b.data.productName)
      );
      this.sortedProductsFromInput = this.productservice.products.sort((a: any, b: any) =>
        a.data.productName.localeCompare(b.data.productName)
      );
    } else {
      this.sortedProducts = this.productservice.products;

    }
  }

  sortByPrice() {
    this.sortedProducts = this.productservice.products.sort((a: any, b: any) => a.data.productPrice - b.data.productPrice);
    this.sortedProductsFromInput = this.productservice.products.sort(
      (a: any, b: any) => b.data.productPrice - a.data.productPrice
    );

  }

  sortByType() {
    this.sortedProducts = this.productservice.products.sort((a: any, b: any) =>
      a.data.typeOfOrder.localeCompare(b.data.typeOfOrder)
    );
    this.sortedProductsFromInput = this.productservice.products.sort((a: any, b: any) =>
      a.data.typeOfOrder.localeCompare(b.data.typeOfOrder)
    );
  }

  productsFromInput(): void {
    if (this.selectedProductSort === 'Product Name') {
      this.inputValuesForProductName();
    }
    else if (this.selectedProductSort === 'Price per unit') {
      this.inputValuesForPrice();
    } else if (this.selectedProductSort === 'Type') {
      this.inputValuesForProductType();
    }
  }

  /*************************** This part is for filtering the products by searchfield and lower cases   *****************/
  inputValuesForProductName() {
    return (this.sortedProductsFromInput = this.productservice.products
      .filter(item =>
        item.data.productName &&
        item.data.productName.toLowerCase().startsWith(this.inputValue.toLowerCase())
      )
    );
  }


  inputValuesForPrice() {
    return (this.sortedProductsFromInput = this.productservice.products
      .filter(
        item => item.data.productPrice.toString().startsWith(this.inputValue.toLowerCase())
      ));
  }


  inputValuesForProductType() {
    return (this.sortedProductsFromInput = this.productservice.products
      .filter(
        item =>
          item.data.typeOfOrder
            .toLowerCase()
            .includes(this.inputValue.toLowerCase())
      ));
  }

  openDialog(): void {
    this.dialog.open(DialogAddProductComponent, {});
  }


}
