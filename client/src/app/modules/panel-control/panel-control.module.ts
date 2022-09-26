import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelControlRoutingModule } from './panel-control-routing.module';
import { PanelControlComponent } from './panel-control.component';
import { SharedModule } from '@shared/shared.module';
import { CategoriasComponent } from './categorias/categorias.component';
import { CrearCategoriasComponent } from './categorias/pages/crear-categorias/crear-categorias.component';
import { EditarCategoriasComponent } from './categorias/pages/editar-categorias/editar-categorias.component';
import { VerCategoriasComponent } from './categorias/pages/ver-categorias/ver-categorias.component';
import { ProductosComponent } from './productos/productos.component';
import { VerProductosComponent } from './productos/pages/ver-productos/ver-productos.component';
import { EditarProductosComponent } from './productos/pages/editar-productos/editar-productos.component';


@NgModule({
  declarations: [
    PanelControlComponent,
    CategoriasComponent,
    VerCategoriasComponent,
    CrearCategoriasComponent,
    EditarCategoriasComponent,
    ProductosComponent,
    VerProductosComponent,
    EditarProductosComponent
  ],
  imports: [
    CommonModule,
    PanelControlRoutingModule,
    SharedModule
  ]
})
export class PanelControlModule { }
