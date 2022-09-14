import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelControlRoutingModule } from './panel-control-routing.module';
import { PanelControlComponent } from './panel-control.component';


@NgModule({
  declarations: [
    PanelControlComponent
  ],
  imports: [
    CommonModule,
    PanelControlRoutingModule
  ]
})
export class PanelControlModule { }
