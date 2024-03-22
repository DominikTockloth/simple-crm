import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.class';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserAddressComponent } from './../dialog-edit-user-address/dialog-edit-user-address.component';
import { DialogEditUserDetailComponent } from '../dialog-edit-user-detail/dialog-edit-user-detail.component';

@Component({
  selector: 'app-user-detail-card',
  standalone: true,
  imports: [RouterLink,
    MatCard,
    MatCardModule,
    NgIf,
    MatIcon,
    MatIconButton,
    MatButtonModule,
    MatMenuModule,
    DialogEditUserAddressComponent,
    DialogEditUserDetailComponent
  ],

  templateUrl: './user-detail-card.component.html',
  styleUrl: './user-detail-card.component.scss'
})

export class UserDetailCardComponent  {

  user: User = new User();
  unsub!: Subscription;
  userId: string | any;

  constructor(
    private route: ActivatedRoute,
    private userservice: UserService,
    public dialog: MatDialog) { 
      this.unsub = this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.getUser();
    })
   }


  async getUser() {
    await this.userservice.loadUser(this.userId);
    this.user = this.userservice.user;
  }

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

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
}
