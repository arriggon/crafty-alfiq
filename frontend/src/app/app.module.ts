// Angular Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Component Imports
import { AppComponent } from './app.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ItemManagementComponent } from './pages/item-management/item-management.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';

// Material Imports
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const MATIMPORTS = [
  MatListModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatInputModule,
  MatToolbarModule,
  MatSnackBarModule
];

const routes: Routes = [
  {path: 'management', component: ItemManagementComponent},
  {path: 'shop', component: ShopComponent},
  {path: '', redirectTo: '/shop', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ItemManagementComponent,
    MenuBarComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ...MATIMPORTS
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
