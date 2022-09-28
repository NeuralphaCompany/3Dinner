import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { CrearProductosComponent } from './pages/crear-productos/crear-productos.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    CrearProductosComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    SharedModule
  ]
})
export class ProductosModule { }
