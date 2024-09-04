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
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './components/product/product.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

export const routes: Routes = [
    {path:"",component:AuthLayoutComponent,children:[
        {path:"",redirectTo:"login",pathMatch:"full"},
        {path:"login",component:LoginComponent},
        {path:"register",component:RegisterComponent},
    ]},
    {path:"",component:BlankLayoutComponent,children:[
        {path:"",redirectTo:"home",pathMatch:"full"},
        {path:"home",component:HomeComponent},
        {path:"brands",component:BrandsComponent},
        {path:"categories",component:CategoriesComponent},
        {path:"about",component:AboutComponent},
        {path:"cart",component:CartComponent},
        {path:"products",component:ProductComponent},
        {path:"wishlist",component:WishlistComponent},
    ]},
    {path:"**",component:NotfoundComponent}
];
