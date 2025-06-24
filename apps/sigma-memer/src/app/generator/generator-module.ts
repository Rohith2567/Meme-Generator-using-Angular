import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneratorRoutingModule } from './generator-routing-module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations:[],
  imports: [
    CommonModule,
    GeneratorRoutingModule,
    HttpClientModule,
  ]
})
export class GeneratorModule { }
