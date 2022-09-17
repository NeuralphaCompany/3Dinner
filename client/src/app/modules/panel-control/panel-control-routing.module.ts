import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCategoriasComponent } from './categorias/pages/crear-categorias/crear-categorias.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { PanelControlComponent } from './panel-control.component';
import { ProductosComponent } from './productos/productos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VentasComponent } from './ventas/ventas.component';

const routes: Routes = [
  {
    path: '',
    component: PanelControlComponent
  },
  {
    path: 'empleados',
    loadChildren: () => import('./empleados/empleados.module')
      .then(m => m.EmpleadosModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module')
      .then(m => m.CategoriasModule)
  },
  {
    path: 'productos',
    component: ProductosComponent
  },
  {
    path: 'ventas',
    component: VentasComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelControlRoutingModule { }
