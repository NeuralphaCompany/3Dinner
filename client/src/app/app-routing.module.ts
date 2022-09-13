import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@shared/pages/login/login.component';

const routes: Routes =
  [
    {
      path: 'usuarios',
      loadChildren: () => import('./modules/usuarios/usuarios.module')
        .then(m => m.UsuariosModule)
    },
    {
      path: 'empleados',
      loadChildren: () => import('./modules/empleados/empleados.module')
        .then(m => m.EmpleadosModule)
    },
    {
      path: 'productos',
      loadChildren: () => import('./modules/productos/productos.module')
        .then(m => m.ProductosModule)
    },
    {
      path: 'categorias',
      loadChildren: () => import('./modules/categorias/categorias.module')
        .then(m => m.CategoriasModule)
    },
    {
      path: 'ventas',
      loadChildren: () => import('./modules/ventas/ventas.module')
        .then(m => m.VentasModule)
    },
    {
      path: 'login',
      component: LoginComponent
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
