import { Component, Input, OnInit } from '@angular/core';
import { ProductoInDB } from '@interfaces/producto';
import { ProductoInside } from '@interfaces/venta';
import { DialogRef } from '@ngneat/dialog';
import { ProductosService } from '@services/productos.service';
import { SharedcomponentsService } from '@services/sharedcomponents.service';
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

  public quantity = 1;

  public prefix = prefix;

  @Input() id: number = 0

  constructor(
    private productoSvc: ProductosService,
    private ref: DialogRef,
    private sharedComponentsSvc: SharedcomponentsService
  ) {
    this.productoSvc.getProduct(this.ref.data.id).subscribe(
      (data: ProductoInDB) => {
        this.product = data
      }
    )

  }

  ngOnInit(): void {

  }

  sum() {
    this.quantity++
  }

  minus() {
    this.quantity--
  }

  cancel() {
    this.ref.close()
  }

  submit(): void {
    this.sharedComponentsSvc.addProduct({
      id: this.product?.id,
      quantity: this.quantity,
      price: this.product?.price,
      name: this.product?.name,
      image: this.product?.image_galery[0]
    } as ProductoInside)
    this.ref.close()
  }


}
