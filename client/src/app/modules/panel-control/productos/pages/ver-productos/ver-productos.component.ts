import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoInDB, ProductosResponse } from '@interfaces/producto';
import { ProductosService } from '@services/productos.service';
import { prefix } from '@shared/data/ruta.api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.component.html',
  styleUrls: ['./ver-productos.component.scss']
})
export class VerProductosComponent implements OnInit {

  public prefix = prefix;

  public productos: ProductoInDB[] = []

  public config: any = {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 50,
      },
      1440:{
        slidesPerView: 3,
      }
    },
  };

  constructor(
    private productoSvc: ProductosService,
    private router: Router
  ) { 
    this.productoSvc.getAllProducts().subscribe(
      (data: ProductosResponse) => {
        this.productos = data.results
      }
    )
  }

  eliminar(id: number) {
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
        this.productoSvc.deleteProduct(id).subscribe({
          next: (data: any) => {
            Swal.fire({
              text: 'La categoría ha sido eliminada',
              icon: 'success',
              confirmButtonText: 'Continuar'
            }).then(() => {
              this.router.navigate(['/panel-control/productos/ver-productos']);
            })
          }
        })
      }
    })
  }

  ngOnInit(): void {
  }

}
