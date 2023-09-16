import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http"
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './service/authconfig.interceptor';

import { AppComponent } from './app.component';
import { AddCategorieComponent } from './components/add-categorie/add-categorie.component';
import { CategorieDetailComponent } from './components/categorie-detail/categorie-detail.component';
import { CategorieListComponent } from './components/categorie-list/categorie-list.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCategorieComponent,
    CategorieDetailComponent,
    CategorieListComponent,
    AddProductComponent,
    ProductDetailComponent,
    ProductListComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
