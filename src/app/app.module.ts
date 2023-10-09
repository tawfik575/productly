import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { FooterComponent } from './footer/footer.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminNavComponent } from './admin-panel/admin-nav/admin-nav.component';
import { ProductsListComponent } from './admin-panel/products-list/products-list.component';
import { UsersComponent } from './admin-panel/users/users.component';
import { AdminsComponent } from './admin-panel/admins/admins.component';

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
    AdminsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
