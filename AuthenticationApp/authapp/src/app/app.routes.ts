import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ConfirmotpComponent } from './component/confirmotp/confirmotp.component';
import { RegisterComponent } from './component/register/register.component';
import { ForgetpasswordComponent } from './component/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { UpdatepasswordComponent } from './component/updatepassword/updatepassword.component';
import { CustomerComponent } from './component/customer/customer.component';
import { UserComponent } from './component/user/user.component';
import { authGuard } from './_guard/auth.guard';
import { UserroleComponent } from './component/userrole/userrole.component';
import { AddcustomerComponent } from './component/addcustomer/addcustomer.component';

export const routes: Routes = [
    {path:'',component:HomeComponent,canActivate:[authGuard]},
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'confirmotp',component:ConfirmotpComponent},
    {path:'forgetpassword',component:ForgetpasswordComponent},
    {path:'resetpassword',component:ResetpasswordComponent},
    {path:'updatepassword',component:UpdatepasswordComponent},
    {path:'Customer',component:CustomerComponent,canActivate:[authGuard]},
    {path:'Customer/add',component:AddcustomerComponent,canActivate:[authGuard]},
    {path:'Customer/edit/:code',component:AddcustomerComponent,canActivate:[authGuard]},
    {path:'User',component:UserComponent,canActivate:[authGuard]},
    {path:'Userrole',component:UserroleComponent,canActivate:[authGuard]}
   
];
