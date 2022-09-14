import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterfazUsuarioRoutingModule } from './interfaz-usuario-routing.module';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { SharedModule } from '@shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductosComponent } from './pages/productos/productos.component';


@NgModule({
  declarations: [
  
    CategoriasComponent,
       ProductosComponent
  ],
  imports: [
    CommonModule,
    InterfazUsuarioRoutingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class InterfazUsuarioModule { }
