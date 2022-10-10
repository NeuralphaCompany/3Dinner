import { Component, Input, OnInit } from '@angular/core';
import { ProductoInDB } from '@interfaces/producto';
import { ProductosService } from '@services/productos.service';
import { prefix } from '@shared/data/ruta.api';
import Swiper, { Pagination } from 'swiper'

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
    private productoSvc: ProductosService
  ) {
    
  }

  ngOnInit(): void {
    this.productoSvc.getProduct(this.id).subscribe(
      (data: ProductoInDB) => {
        this.product = data
      }
    )
  }

}
