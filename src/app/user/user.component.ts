import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { DialogAddUserComponent } from './../dialog-add-user/dialog-add-user.component';
import { NgFor} from '@angular/common';
import { UserService } from '../services/user.service';
import { RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltip,
    MatCardModule,
    DialogAddUserComponent,
    NgFor,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  userId!: string;
  constructor(public dialog: MatDialog, private userservice: UserService) { }

  ngOnInit(): void {
    this.usersFromService();
  }

  usersFromService() {
    return this.userservice.users;
  }

  openDialog(): void {
    this.dialog.open(DialogAddUserComponent, {});
  }
}
