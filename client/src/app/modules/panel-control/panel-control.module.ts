import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelControlRoutingModule } from './panel-control-routing.module';
import { PanelControlComponent } from './panel-control.component';
import { SharedModule } from '@shared/shared.module';
import { CategoriasComponent } from './categorias/categorias.component';
import { CrearCategoriasComponent } from './categorias/pages/crear-categorias/crear-categorias.component';
import { EditarCategoriasComponent } from './categorias/pages/editar-categorias/editar-categorias.component';
import { VerCategoriasComponent } from './categorias/pages/ver-categorias/ver-categorias.component';


@NgModule({
  declarations: [
    PanelControlComponent,
    CategoriasComponent,
    VerCategoriasComponent,
    CrearCategoriasComponent,
    EditarCategoriasComponent
  ],
  imports: [
    CommonModule,
    PanelControlRoutingModule,
    SharedModule
  ]
})
export class PanelControlModule { }
