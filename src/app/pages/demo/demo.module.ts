import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { CompOneComponent } from './comp-one/comp-one.component';


@NgModule({
  declarations: [
    CompOneComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule
  ]
})
export class DemoModule { }
