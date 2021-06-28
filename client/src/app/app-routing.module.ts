import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admin/products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) }, 
  { path: 'sign_in', loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule) }, 
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) }, 
  { path: 'admin/category', loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
