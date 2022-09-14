import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@shared/pages/login/login.component';

const routes: Routes =
  [
    {
      path: 'panel-control',
      loadChildren: () => import('./modules/panel-control/panel-control.module')
        .then(m => m.PanelControlModule)
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
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
