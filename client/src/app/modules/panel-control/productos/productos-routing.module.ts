import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearProductosComponent } from './pages/crear-productos/crear-productos.component';
import { EditarProductosComponent } from './pages/editar-productos/editar-productos.component';
import { VerProductosComponent } from './pages/ver-productos/ver-productos.component';
import { ProductosComponent } from './productos.component';

const routes: Routes = [
  { 
    path: '',
   component: ProductosComponent
  },
  {
    path: 'crear-productos',
    component: CrearProductosComponent
  },
  {
    path: 'ver-productos',
    component: VerProductosComponent
  },
  {
    path: 'editar-producto/:id',
    component: EditarProductosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
