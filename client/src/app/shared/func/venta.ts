import { Injectable } from "@angular/core";
import { ProductoInDB } from "@interfaces/producto";
import { ProductoInside, Venta } from "@interfaces/venta";
import { ProductosService } from "@services/productos.service";
import { map, switchMap } from "rxjs";

@Injectable()
export class ventaTotal {
    constructor(
        private productosSvc: ProductosService,
    ) {

    }

    totalVenta(venta: Venta) {
        let total = 0;
        for (let producto of venta.productos) {
            this.productosSvc.getProduct(producto.id).subscribe(
                (product: ProductoInDB) => {
                    total += product.price * producto.quantity
                }
            )
        }
        return total
    }

    totalCart(productos: ProductoInside[]) {
        let total = productos.map(value => value.price * value.quantity).reduce((a, b) => a + b)
        return total
    }
}