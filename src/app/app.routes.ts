import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { ContactComponent } from './contact/contact.component';
import { BookComponent } from './book/book.component';
import { DishComponent } from './dish/dish.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { authGuard } from './auth.guard';
import { logedGuard } from './loged.guard';
import { AdminComponent } from './admin/admin.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AddProductComponent } from './add-product/add-product.component';

export const routes: Routes = [
  {path:'', component:AuthLayoutComponent,canActivate:[logedGuard], children:[
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
  ]},
  {path:'', component:LayoutComponent, canActivate:[authGuard], children:[
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'product/:id', component: DishComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'book', component: BookComponent },
]},
  { path: 'admin', component: AdminComponent },
  { path: 'update/:id', component: UpdateProductComponent },
  { path: 'add', component: AddProductComponent },

];
