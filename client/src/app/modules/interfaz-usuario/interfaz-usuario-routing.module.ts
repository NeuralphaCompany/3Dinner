import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ProductosComponent } from './pages/productos/productos.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriasComponent
  },
  {
    path: 'productos/:id',
    component: ProductosComponent
  },
  {
    path: 'productos',
    component: ProductosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterfazUsuarioRoutingModule { }
