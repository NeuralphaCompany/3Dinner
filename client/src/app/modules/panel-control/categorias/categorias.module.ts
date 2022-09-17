import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasComponent } from './categorias.component';
import { VerCategoriasComponent } from './pages/ver-categorias/ver-categorias.component';
import { CrearCategoriasComponent } from './pages/crear-categorias/crear-categorias.component';
import { EditarCategoriasComponent } from './pages/editar-categorias/editar-categorias.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    CategoriasComponent,
    VerCategoriasComponent,
    CrearCategoriasComponent,
    EditarCategoriasComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    SharedModule
  ]
})
export class CategoriasModule { }
