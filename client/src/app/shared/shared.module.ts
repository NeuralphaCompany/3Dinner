import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule,
    RouterModule,
    NgSelectModule
  ],
  exports: [
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    SwiperModule,
    NgSelectModule
  ]
})
export class SharedModule { }
