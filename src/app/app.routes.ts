import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailCardComponent } from './user-detail-card/user-detail-card.component';
import { ImprintComponent } from './imprint/imprint.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProductsComponent } from './products/products.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { RegisterComponent } from './register/register.component';


export const routes: Routes = [
    { path: '', component: SignInComponent },
    { path: 'sign-in', component: SignInComponent },
    {path:'register', component:RegisterComponent},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'user', component: UserComponent },
    { path: 'user/:id', component: UserDetailCardComponent },
    { path: 'imprint', component: ImprintComponent },
    { path: 'privacy-policy', component: PrivacyComponent }
];
