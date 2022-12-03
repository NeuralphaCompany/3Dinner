import { AfterContentChecked, AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductoInDB } from '@interfaces/producto';
import { ProductoInside, Venta, VentaInDB } from '@interfaces/venta';
import { ProductosService } from '@services/productos.service';
import { SharedcomponentsService } from '@services/sharedcomponents.service';
import { VentasService } from '@services/ventas.service';
import { prefix } from '@shared/data/ruta.api';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: ProductoInside[] = [];

  public productsObservable = new Observable<ProductoInside[]>();

  public total$ = this.sharedComponetsSvc.total$;

  public prefix = prefix

  constructor(
    private productosSvc: ProductosService,
    private sharedComponetsSvc: SharedcomponentsService,
    private fb: FormBuilder,
    private ventasSvc: VentasService,
    private cookieSvc: CookieService
  ) {
    this.products = this.sharedComponetsSvc.products
    // this.sharedComponetsSvc.total$.subscribe(total => this.total = total)
  }

  form = this.fb.group({
    observacion: ['', [Validators.maxLength(255)]]
  })

  ngOnInit(): void {
    this.ventasSvc.myWebSocket.asObservable().subscribe()

  }

  submit() {
    let venta: Venta = {
      productos: this.products,
      adiciones: [],
      mesa: 1,
      observacion: this.form.value.observacion? this.form.value.observacion : ''
    } 
    this.ventasSvc.post(venta).subscribe({
      next: (res:VentaInDB) => {
        this.ventasSvc.myWebSocket.next(res)
        Swal.fire({
          title:'Su pedido se recibió de manera exitosa',
          text: '¿Quieres descargar tu factura?',
          confirmButtonText: 'Ver factura',
          cancelButtonText: 'Cancelar',
          buttonsStyling: false,
          showCancelButton: true,
          customClass: {
            confirmButton: 'button is-success is-rounded',
            cancelButton: 'button ml-2 is-dark is-rounded is-outlined'
          }
        }).then(
          ((result)=> {
            if (result.isConfirmed){
              this.ventasSvc.getFactura(res.id).subscribe(
                (res:any) => {
                  window.open(window.URL.createObjectURL(res));
                }
              )
            }
          })
        )
        this.sharedComponetsSvc.deleteCart()
      }
    })
  
  }

  removeProduct(producto: ProductoInside) {
    this.sharedComponetsSvc.removeProduct(producto)
  }

}
