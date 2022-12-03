import { AfterContentChecked, AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductoInDB } from '@interfaces/producto';
import { ProductoInside } from '@interfaces/venta';
import { ProductosService } from '@services/productos.service';
import { SharedcomponentsService } from '@services/sharedcomponents.service';
import { prefix } from '@shared/data/ruta.api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: ProductoInside[] = [];

  public productsObservable = new Observable<ProductoInside[]>();

  public total = 0;


  public prefix = prefix

  constructor(
    private productosSvc: ProductosService,
    private sharedComponetsSvc: SharedcomponentsService,
    private fb: FormBuilder
  ) {
    this.products = this.sharedComponetsSvc.products
    this.sharedComponetsSvc.total$.subscribe(total => this.total = total)
  }

  form = this.fb.group({
    observacion: ['', [Validators.maxLength(255)]]
  })

  ngOnInit(): void {

  }

}
