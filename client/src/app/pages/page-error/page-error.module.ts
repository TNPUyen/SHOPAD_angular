import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageErrorRoutingModule } from './page-error-routing.module';
import { PageErrorComponent } from './page-error.component';


@NgModule({
  declarations: [
    PageErrorComponent
  ],
  imports: [
    CommonModule,
    PageErrorRoutingModule
  ]
})
export class PageErrorModule { }
