import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { UpdateFormComponent } from './components/update-form/update-form.component';

import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    ProductsComponent,
    UpdateFormComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgxPaginationModule
  ]
})
export class ProductsModule { }
