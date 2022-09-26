import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearProductosComponent } from './pages/crear-productos/crear-productos.component';
import { ProductosComponent } from './productos.component';

const routes: Routes = [
  { 
    path: '',
   component: ProductosComponent
  },
  {
    path: 'crear-productos',
    component: CrearProductosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
