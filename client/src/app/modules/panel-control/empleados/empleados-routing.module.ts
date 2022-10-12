import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './empleados.component';
import { CrearEmpleadosComponent } from './pages/crear-empleados/crear-empleados.component';
import { EditarEmpleadoComponent } from './pages/editar-empleado/editar-empleado.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { VerEmpleadosComponent } from './pages/ver-empleados/ver-empleados.component';

const routes: Routes = [
  {
    path: '',
    component: EmpleadosComponent
  },
  {
    path: 'registrar-empleado',
    component: CrearEmpleadosComponent,
  },
  {
    path: 'editar-empleado',
    component: EditarEmpleadoComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'ver-empleados',
    component: VerEmpleadosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
