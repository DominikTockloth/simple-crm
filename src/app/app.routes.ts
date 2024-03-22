import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailCardComponent } from './user-detail-card/user-detail-card.component';
import { ImprintComponent } from './imprint/imprint.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
    { path: '', component: SignInComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user', component: UserComponent },
    { path: 'user/:id', component: UserDetailCardComponent },
    { path: 'imprint', component: ImprintComponent }
];
