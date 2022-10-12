import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoInDB, ProductosResponse } from '@interfaces/producto';
import { ProductoComponent } from '@modules/interfaz-usuario/components/producto/producto.component';
import { DialogService } from '@ngneat/dialog';
import { AuthService } from '@services/auth.service';
import { CategoriasService } from '@services/categorias.service';
import { ProductosService } from '@services/productos.service';
import { prefix } from '@shared/data/ruta.api';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  public prefix = prefix;

  private id = 0;

  public isLoged = this.authSvc.isLoggedIn();

  public products: ProductosResponse | undefined;

  constructor(
    private activeRoute: ActivatedRoute,
    private categorySvc: CategoriasService,
    private productSvc: ProductosService,
    private modalSvc: DialogService,
    private authSvc: AuthService,
    private cd: ChangeDetectorRef
  ) {
    const productos$ = this.activeRoute.params.pipe(
      switchMap((params: any) => {
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

  openProduct(id: number): void {
    const modalRef = this.modalSvc.open(ProductoComponent, {
      data: {
        id: id
      }
    })
  }

  eliminar(id:number){
    Swal.fire({
      text: "¿Está seguro de querer eliminar el producto?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
      buttonsStyling: false,
      customClass: {
        confirmButton: "button is-danger is-rounded",
        cancelButton: "button ml-2 is-dark is-rounded is-outlined"
      }
    }).then((res) => {
      if (res.isConfirmed) {
        this.productSvc.deleteProduct(id).subscribe({
          next: (data: any) => {
            Swal.fire({
              text: 'La categoría ha sido eliminada',
              icon: 'success',
              confirmButtonText: 'Continuar'
            }).then(()=>{
              this.cd.detectChanges()
            })
          }
        })
      }
    })
  }

}
