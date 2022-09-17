import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias.component';
import { CrearCategoriasComponent } from './pages/crear-categorias/crear-categorias.component';
import { EditarCategoriasComponent } from './pages/editar-categorias/editar-categorias.component';
import { VerCategoriasComponent } from './pages/ver-categorias/ver-categorias.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriasComponent
  },
  {
    path: 'crear-categoria',
    component: CrearCategoriasComponent
  },
  {
    path: 'ver-categorias',
    component: VerCategoriasComponent
  },
  {
    path: 'editar-categoria/:id',
    component: EditarCategoriasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
