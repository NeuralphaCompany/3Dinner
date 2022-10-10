import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoInDB, ProductosResponse } from '@interfaces/producto';
import { CategoriasService } from '@services/categorias.service';
import { ProductosService } from '@services/productos.service';
import { prefix } from '@shared/data/ruta.api';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  public prefix = prefix

  private id = 0 

  public products: ProductosResponse | undefined;

  constructor(
    private activeRoute: ActivatedRoute,
    private categorySvc: CategoriasService,
    private productSvc: ProductosService
  ) { 
    const productos$ = this.activeRoute.params.pipe(
      switchMap((params:any) => {
        const id = params['id'] as number
        if (id) {
          return this.categorySvc.getProducts(id)
        } else {
          return this.productSvc.getAllProducts()
        }
        
      })
    )

    productos$.subscribe(
      (data: ProductosResponse) => {
        this.products = data
      }
    )

  }

  ngOnInit(): void {
  }

}
