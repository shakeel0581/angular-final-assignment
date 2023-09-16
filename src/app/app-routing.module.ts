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
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: 'log-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'add-category', component: AddCategorieComponent},
  { path: 'category-list', component: CategorieListComponent},
  { path: 'add-category', component: AddCategorieComponent},
  { path: 'edit-category/:id', component: CategorieDetailComponent},
  { path: 'product-list', component: ProductListComponent},
  { path: 'add-product', component: AddProductComponent},
  { path: 'edit-product/:id', component: ProductDetailComponent},
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
