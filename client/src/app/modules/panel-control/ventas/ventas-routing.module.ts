import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasActivasComponent } from './pages/ventas-activas/ventas-activas.component';
import { VentasComponent } from './ventas.component';

const routes: Routes = [
  { 
    path: '', 
    component: VentasComponent 
  }, 
  {
    path: 'activas',
    component: VentasActivasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
