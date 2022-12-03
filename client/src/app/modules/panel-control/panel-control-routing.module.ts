import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelControlComponent } from './panel-control.component';
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
    loadChildren: () => import('./productos/productos.module')
      .then(m => m.ProductosModule)
  },
  {
    path: 'ventas',
    loadChildren: () => import('./ventas/ventas.module')
    .then(m => m.VentasModule)
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
