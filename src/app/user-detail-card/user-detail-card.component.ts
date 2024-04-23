import { Component } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.class';
import { NgFor, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { DialogEditUserAddressComponent } from './../dialog-edit-user-address/dialog-edit-user-address.component';
import { DialogEditUserDetailComponent } from '../dialog-edit-user-detail/dialog-edit-user-detail.component';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';
import { DialogAddOrderComponent } from '../dialog-add-order/dialog-add-order.component';
import { ProductService } from '../services/product.service';
import { OrderService } from '../services/order.service';
import { Order } from '../../models/order.class';
import { DialogEditOrderComponent } from '../dialog-edit-order/dialog-edit-order.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteOrderComponent } from '../dialog-delete-order/dialog-delete-order.component';

@Component({
  selector: 'app-user-detail-card',
  standalone: true,
  imports: [RouterLink,
    MatCard,
    MatCardModule,
    NgIf,
    NgFor,
    MatIcon,
    MatIconButton,
    MatButtonModule,
    MatMenuModule,
    DialogEditUserAddressComponent,
    DialogEditUserDetailComponent,
    DialogDeleteUserComponent
  ],

  templateUrl: './user-detail-card.component.html',
  styleUrl: './user-detail-card.component.scss'
})

export class UserDetailCardComponent {
  products: any[] = [];
  orders: any[] = [];
  user: User = new User();
  order: Order = new Order();
  unsub!: Subscription;
  userId: string = '';
  orderId: string = '';
  data: any;


  constructor(
    private route: ActivatedRoute,
    private userservice: UserService,
    private productservice: ProductService,
    private orderservice: OrderService,
    public dialog: MatDialog,

  ) {
    this.unsub = this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.getUser();
    })
  }


  async getUser() {
    await this.userservice.loadUser(this.userId);
    this.user = this.userservice.user;
  }

  /**
   * This function is checking, if user made orders and sorts them directly
   * @returns the sorted orders from specific user , with newest order first
   */
  ordersFromUser() {
    const userOrders = this.orderservice.orders.filter(order => order.data.userId === this.userId);
    userOrders.sort((a: any, b: any) => {
      const orderA = a.data.dateOfOrder;
      const orderB = b.data.dateOfOrder;
      return orderB - orderA; // Sortiere nach absteigendem Datum
    });
    return userOrders;
  }

  /*
    ordersFromUser() {
      return  this.orderservice.orders.filter(order => order.data.userId === this.userId);
    }
  */

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

  /*******************************   Order date and birthday formatting functions   *******************************/
  /**
   * @returns - formatted order date
   */
  formatOrderDate(timestamp: any): string {
    const date = new Date(timestamp.seconds * 1000);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    };
    return date.toLocaleDateString('de-DE', options);
  }


  /**
   * @returns - formatted birthdate
   */
  formatDate(timestamp: any): string {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString('de-DE');
  }

  /*******************************  Calculates of the total order sum from user   ***********************************/
  totalSumCalculation(): number {
    const userOrders = this.orderservice.orders.filter(order => order.data.userId === this.userId);
    const total = userOrders.reduce(
      (total, order) => total + order.data.amount * order.data.price, 0
    );
    return parseFloat(total.toFixed(2));
  }


  /*******************************  Edit user and open dialog functions    ******************************************/
  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserDetailComponent, {
      data: {
        userId: this.userId,
        user: this.user
      }
    });
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userId;
  }

  editUserAddress() {
    const dialog = this.dialog.open(DialogEditUserAddressComponent, {
      data: {
        userId: this.userId,
        user: this.user
      }
    });
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userId;
  }

  openDeleteDialog() {
    const dialog = this.dialog.open(DialogDeleteUserComponent, {
      data: {
        userId: this.userId,
        user: this.user
      }
    });
    dialog.componentInstance.user = new User(this.user);
    dialog.componentInstance.userId = this.userId;

  }
  /*************************************    Edit / Delete / open order dialog  functions     *****************************************/

  openAddOrderDialog() {
    const dialog = this.dialog.open(DialogAddOrderComponent);
    dialog.componentInstance.userId = this.userId;
    dialog.componentInstance.products = this.productservice.products;

  }

  openEditOrder(data: Order) {
    const dialog = this.dialog.open(DialogEditOrderComponent, {
      data: {
        order: data
      }
    }
    );
    dialog.componentInstance.data = data;
    dialog.componentInstance.products = this.productservice.products;
    dialog.componentInstance.currentProduct = data;
  }

  openDeleteOrder(data: Order) {
    const dialog = this.dialog.open(DialogDeleteOrderComponent, {
      data: {
        order: data
      }
    }
    );
    dialog.componentInstance.data = data;
  }
}

