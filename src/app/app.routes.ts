import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AboutComponent } from './components/about/about.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { logedGuard } from './core/guards/loged.guard';
import { authGuard } from './core/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AllordersComponent } from './components/allorders/allorders.component';

export const routes: Routes = [
    {path:"",component:AuthLayoutComponent,canActivate:[logedGuard],children:[
        {path:"",redirectTo:"login",pathMatch:"full"},
        {path:"login",component:LoginComponent},
        {path:"register",component:RegisterComponent},
        {path:'forgot',component:ForgotComponent},
    ]},
    {path:"",component:BlankLayoutComponent,canActivate:[authGuard],children:[
        {path:"",redirectTo:"home",pathMatch:"full"},
        {path:"home",component:HomeComponent},
        {path:"brands",component:BrandsComponent},
        {path:"categories",component:CategoriesComponent},
        {path:"about",component:AboutComponent},
        {path:"cart",component:CartComponent},
        {path:"products",component:ProductComponent},
        {path:"wishlist",component:WishlistComponent},
        {path:'details/:id',component:DetailsComponent},
        {path:'orders/:id',component:OrdersComponent},
        {path:'allorders',component:AllordersComponent},
        
    ]},
    {path:"**",component:NotfoundComponent}
];
