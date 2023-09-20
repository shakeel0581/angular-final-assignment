import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorieListComponent } from './components/categorie-list/categorie-list.component';
import { AddCategorieComponent } from './components/add-categorie/add-categorie.component';
import { RouterModule, Routes } from '@angular/router';
import { CategorieDetailComponent } from './components/categorie-detail/categorie-detail.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProductPublicComponent } from './product-public/product-public.component';

import { AuthGuard } from './shared/auth.guard';
import { AuthLoginGuard } from './shared/auth-login.guard';

const routes: Routes = [
  {
    path: 'available-product/:offset/:limit',
    component: ProductPublicComponent,
  },
  {
    path: '',
    redirectTo: 'available-product/0/9',
    pathMatch: 'full',
  },
  { path: 'log-in', component: SigninComponent, canActivate: [AuthLoginGuard] },
  {
    path: 'sign-up',
    component: SignupComponent,
    canActivate: [AuthLoginGuard],
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-category',
    component: AddCategorieComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'category-list',
    component: CategorieListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-category',
    component: AddCategorieComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-category/:id',
    component: CategorieDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product-list/:offset/:limit',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-product/:id',
    component: ProductDetailComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
