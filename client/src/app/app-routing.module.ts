import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@shared/pages/login/login.component';
import { NotFoundComponent } from '@shared/pages/not-found/not-found.component';
import { EmpleadoGuard } from './core/guards/empleado.guard';

const routes: Routes =
  [
    {
      path: 'panel-control',
      loadChildren: () => import('./modules/panel-control/panel-control.module')
        .then(m => m.PanelControlModule),
      canActivate: [EmpleadoGuard]
    },
    {
      path: 'home',
      loadChildren: () => import('./modules/interfaz-usuario/interfaz-usuario.module')
        .then(m => m.InterfazUsuarioModule)
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path:'',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: '**',
      redirectTo: 'not-found'
    },
    {
      path: 'not-found',
      component: NotFoundComponent
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
