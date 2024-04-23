import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import Chart from 'chart.js/auto';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/firebase-auth.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCard,
    MatIcon,
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {
  public orderChart: any;
  public productChart: any;
  usersWithMostOrders: string[] = [];
  productsMostSold: string[] = [];
  productCounts: number[] = [];
  orderCounts: number[] = [];
  allProducts: number = 0;
  allUsers: number = 0;
  totalRevenue: number = 0;
  displayName: string = '';

  constructor(
    public orderservice: OrderService,
    public userservice: UserService,
    public productservice: ProductService,
    public authservice: AuthService
  ) {

  }


  async ngOnInit(): Promise<void> {
    await this.getUserName();
    await this.productsFromDatabase();
    await this.usersFromDatabase();
    await this.totalRevenueFromDataBase();
    await this.getTopThreeUsersWithMostOrders();
    await this.getTopThreeProductsMostSold();
    this.renderChartForOrders();
    this.renderChartForProducts();
  }

  /*******  This is for updating the greet text with the logged in user or guest   *******************************/
  async getUserName() {
    await this.authservice.getName();
    this.displayName = this.authservice.displayName;
  }


  /******  This part is for calculating the complete revenue of all orders done by users in dashboard   *********/
  async totalRevenueFromDataBase() {
    const orderData = await this.orderservice.orders;
    const orderTotal = await this.calculateOrderTotal(orderData);
    this.totalRevenue += orderTotal;
    this.totalRevenue = parseFloat(this.totalRevenue.toFixed(2));
  }

  async calculateOrderTotal(orderData: any[]) {
    let total = 0;
    for (const order of orderData) {
      const amount = order.data.amount;
      const price = order.data.price;
      total += amount * price;
    }
    return total;
  }


  /**
   * Gets the amount of registred products to display in dashboard
   */
  async productsFromDatabase() {
    const data = await this.productservice.products;
    this.allProducts = data.length;

  }

  /**
   * Gets the amount of users , to display in dashboard 
   */
  async usersFromDatabase() {
    const data = await this.userservice.users;
    this.allUsers = data.length;

  }

  /**
   * This function extracts the top 3 users with most orders,
   * and returns the names to display
   */
  getTopThreeUsersWithMostOrders() {
    const orders = this.orderservice.orders;
    const users = this.userservice.users;
    const userOrderCounts: Map<string, number> = new Map(); // amount of orders per user gets counted
    orders.forEach(order => {
      const userId = order.data.userId;
      if (userOrderCounts.has(userId)) {
        userOrderCounts.set(userId, userOrderCounts.get(userId)! + 1);
      } else {
        userOrderCounts.set(userId, 1);
      }
    });
    const sortedUsers = Array.from(userOrderCounts.keys()).sort((a, b) => {// sorts users by amount of order (top-down)
      return userOrderCounts.get(b)! - userOrderCounts.get(a)!;
    });
    const topThreeUsers = sortedUsers.slice(0, 3);// top 3 users gets choosen
    topThreeUsers.forEach(userId => { // Extrahiere die Namen der Benutzer und speichere die Anzahl der Bestellungen in this.ordercounts
      const user = users.find(user => user.id === userId);
      const userName = user ? `${user.data.firstName} ${user.data.lastName}` : '';
      const orderCount = userOrderCounts.get(userId) || 0;
      this.usersWithMostOrders.push(userName);
      this.orderCounts.push(orderCount);
    });
  }


  /**
   * This function extracts the top 3 most sold products to display in chart
   */
  getTopThreeProductsMostSold() {
    const orders = this.orderservice.orders;
    const productOrderCounts: Map<string, number> = new Map(); // Menge der verkauften Produkte wird gezählt

    orders.forEach(order => {
      const productName = order.data.product;
      const quantity = order.data.amount; // Menge des verkauften Produkts aus der Bestellung
      if (productOrderCounts.has(productName)) {
        productOrderCounts.set(productName, productOrderCounts.get(productName)! + quantity);
      } else {
        productOrderCounts.set(productName, quantity);
      }
    });

    // Sortiere die Produkte nach der Menge, die am meisten verkauft wurde
    const sortedProducts = Array.from(productOrderCounts.entries()).sort((a, b) => b[1] - a[1]);

    // Wähle die Top 3 verkauften Produkte aus
    const topThreeProducts = sortedProducts.slice(0, 3);

    // Extrahiere die Namen und Mengen der Top 3 Produkte und speichere sie in den entsprechenden Arrays
    topThreeProducts.forEach(([productName, quantity]) => {
      this.productsMostSold.push(productName);
      this.productCounts.push(quantity);
    });
  }

  /**
   * This creates the chart for the most orders of users
   */
  renderChartForOrders() {
    this.orderChart = new Chart('orderChartCanvas', {
      type: 'bar',
      data: {
        labels: [
          this.usersWithMostOrders[0],
          this.usersWithMostOrders[1],
          this.usersWithMostOrders[2]
        ],
        datasets: [{
          label: 'Most orders by user',
          data: [
            this.orderCounts[0],
            this.orderCounts[1],
            this.orderCounts[2]],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(245,130,9,0.2)',
            'rgba(36,154,65,0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(245, 130, 9, 1)',
            'rgba(36,154,65,1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            ticks: {
              color: '#fff',
              font: { 'size': 12 },
            },
          },
          y: {
            ticks: {
              color: '#fff',
              font: { 'size': 12 },

            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: '#fff',
            },
          },
        },
      },
    });
  }

  /**
   * This creates the chart for most products sold
   */
  renderChartForProducts() {
    this.productChart = new Chart('productChartCanvas', {
      type: 'bar',
      data: {
        labels: [
          this.productsMostSold[0],
          this.productsMostSold[1],
          this.productsMostSold[2]
        ],
        datasets: [{
          label: 'Most products sold',
          data: [
            this.productCounts[0],
            this.productCounts[1],
            this.productCounts[2]],
          backgroundColor: [
            'rgba(36,154,65,0.2)',
            'rgba(245,130,9,0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(36,154,65,1)',
            'rgba(245, 130, 9, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            ticks: {
              color: '#fff',
              font: { 'size': 10 },

            },
          },
          y: {
            ticks: {
              color: '#fff',
              font: { 'size': 10 },

            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: '#fff',

            },
          },
        },
      },
    });
  }

}








