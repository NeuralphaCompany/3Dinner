import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasComponent } from './ventas.component';
import { VentasActivasComponent } from './pages/ventas-activas/ventas-activas.component';


@NgModule({
  declarations: [
    VentasComponent,
    VentasActivasComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule
  ]
})
export class VentasModule { }
