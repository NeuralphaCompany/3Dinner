import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ProductoInside } from '@interfaces/venta';
import { ventaTotal } from '@shared/func/venta';
import { ProductosService } from './productos.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SharedcomponentsService {

  public products$: Subject<ProductoInside[]> = new Subject<ProductoInside[]>();
  public products: ProductoInside[] = [];
  public total$: Subject<number> = new Subject<number>();

  constructor(
    private ventaTotal: ventaTotal,
    private productoSvc: ProductosService,
    private cookieSvc: CookieService
  ) {

    if (this.cookieSvc.check('cart')) {
      this.products = JSON.parse(this.cookieSvc.get('cart'))
      this.products$.next(this.products)
    }

  }



  // Productos, footer y carrito
  refreshtotal() {
    const total = this.ventaTotal.totalCart(this.products);
    this.total$.next(total)
  }


  addProduct(producto: ProductoInside) {
    let index = this.products.indexOf(producto)
    if (index == -1) {
      this.products.push(producto);
      this.products$.next(this.products);
      this.refreshtotal()
      this.refreshCarritoCookie()
    } else {
      this.products[index].quantity += producto.quantity
      this.products$.next(this.products);
      this.refreshtotal()
      this.refreshCarritoCookie()
    }


  }


  removeProduct(producto: ProductoInside) {
    const index = this.products.indexOf(producto);
    this.products.splice(index, 1);
    this.products$.next(this.products)
    this.refreshtotal()
    this.refreshCarritoCookie()
  }


  refreshCarritoCookie() {
    if (this.products.length > 1) {
      this.cookieSvc.set('cart', JSON.stringify(this.products))
      this.refreshtotal()
    }

  }
}
