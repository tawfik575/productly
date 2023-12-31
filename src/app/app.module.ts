import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './users-section/navbar/navbar.component';
import { ProductsComponent } from './users-section/products/products.component';
import { FooterComponent } from './footer/footer.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminNavComponent } from './admin-panel/admin-nav/admin-nav.component';
import { ProductsListComponent } from './admin-panel/products-list/products-list.component';
import { UsersComponent } from './admin-panel/users/users.component';
import { AdminsComponent } from './admin-panel/admins/admins.component';
import { CartComponent } from './users-section/cart/cart.component';
import { UsersSectionComponent } from './users-section/users-section.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    FooterComponent,
    AdminPanelComponent,
    AdminNavComponent,
    ProductsListComponent,
    UsersComponent,
    AdminsComponent,
    CartComponent,
    UsersSectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }