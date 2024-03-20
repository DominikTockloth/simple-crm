import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailCardComponent } from './user-detail-card/user-detail-card.component';
import { ImprintComponent } from './imprint/imprint.component';


export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user', component: UserComponent },
    { path: 'user/:id', component: UserDetailCardComponent },
    { path: 'imprint', component: ImprintComponent }
];
