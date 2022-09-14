import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
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
    component: EmpleadosComponent
  },
  {
    path: 'categorias',
    component: CategoriasComponent
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
