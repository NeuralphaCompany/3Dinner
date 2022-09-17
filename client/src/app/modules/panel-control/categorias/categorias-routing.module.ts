import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias.component';
import { CrearCategoriasComponent } from './pages/crear-categorias/crear-categorias.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriasComponent
  },
  {
    path: 'crear-categoria',
    component: CrearCategoriasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
