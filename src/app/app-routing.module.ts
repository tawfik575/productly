import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './users-section/products/products.component';
import { CartComponent } from './users-section/cart/cart.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UsersSectionComponent } from './users-section/users-section.component';
import { ProductsListComponent } from './admin-panel/products-list/products-list.component';
import { AdminsComponent } from './admin-panel/admins/admins.component';
import { UsersComponent } from './admin-panel/users/users.component';


const routes: Routes = [
  {
    path: '', component: UsersSectionComponent, children: [
      { path: '', component: ProductsComponent, title: 'Productly' },
      { path: 'cart', component: CartComponent, title: 'Cart' }
    ]
  },
  {
    path: 'admin', component: AdminPanelComponent, title: 'Admin Panel', children: [
      { path: '', component: ProductsListComponent },
      { path: 'admins', component: AdminsComponent },
      { path: 'users', component: UsersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }