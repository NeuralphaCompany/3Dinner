import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { CrearEmpleadosComponent } from './pages/crear-empleados/crear-empleados.component';
import { EditarEmpleadoComponent } from './pages/editar-empleado/editar-empleado.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    CrearEmpleadosComponent,
    EditarEmpleadoComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    SharedModule
  ]
})
export class EmpleadosModule { }
