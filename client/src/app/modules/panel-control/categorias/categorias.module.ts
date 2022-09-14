import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasComponent } from './categorias.component';
import { VerCategoriasComponent } from './pages/ver-categorias/ver-categorias.component';
import { CrearCategoriasComponent } from './pages/crear-categorias/crear-categorias.component';
import { EditarCategoriasComponent } from './pages/editar-categorias/editar-categorias.component';


@NgModule({
  declarations: [
    CategoriasComponent,
    VerCategoriasComponent,
    CrearCategoriasComponent,
    EditarCategoriasComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule
  ]
})
export class CategoriasModule { }
