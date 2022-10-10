import { Component, Input, OnInit } from '@angular/core';
import { ProductoInDB } from '@interfaces/producto';
import { DialogRef } from '@ngneat/dialog';
import { ProductosService } from '@services/productos.service';
import { prefix } from '@shared/data/ruta.api';
import SwiperCore, { Pagination } from 'swiper'

SwiperCore.use([Pagination])

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  public product: ProductoInDB | undefined;

  public prefix = prefix

  @Input() id: number = 0

  constructor(
    private productoSvc: ProductosService,
    private ref: DialogRef
  ) {
    this.productoSvc.getProduct(this.ref.data.id).subscribe(
      (data: ProductoInDB) => {
        this.product = data
      }
    )
    
  }

  ngOnInit(): void {
    
  }

}
