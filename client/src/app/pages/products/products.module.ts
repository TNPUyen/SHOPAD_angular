import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { UpdateFormComponent } from './components/update-form/update-form.component';
import { ShareModule } from 'src/app/modules/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    ProductsComponent,
    UpdateFormComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ShareModule,
    ModalModule.forRoot(),

  ]
})
export class ProductsModule { }
