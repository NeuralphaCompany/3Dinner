import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelControlRoutingModule } from './panel-control-routing.module';
import { PanelControlComponent } from './panel-control.component';
import { SharedModule } from '@shared/shared.module';
import { CategoriasComponent } from './categorias/categorias.component';


@NgModule({
  declarations: [
    PanelControlComponent,
    // CategoriasComponent
  ],
  imports: [
    CommonModule,
    PanelControlRoutingModule,
    SharedModule
  ]
})
export class PanelControlModule { }
