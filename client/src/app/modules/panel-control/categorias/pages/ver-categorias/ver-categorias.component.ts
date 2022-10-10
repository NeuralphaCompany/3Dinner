import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesResponse } from '@interfaces/categoria';
import { CategoriasService } from '@services/categorias.service';
import { prefix } from '@shared/data/ruta.api';
import Swal from 'sweetalert2';
import Swiper from 'swiper';

@Component({
  selector: 'app-ver-categorias',
  templateUrl: './ver-categorias.component.html',
  styleUrls: ['./ver-categorias.component.scss']
})
export class VerCategoriasComponent implements OnInit {

  public prefix = prefix

  slidesPerView: number = 3

  categories: any[] = [
  ];

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
    private categoriesSvc: CategoriasService,
    private router: Router
  ) {
    this.categoriesSvc.getCategorias().subscribe({
      next: (data: CategoriesResponse) => {
        this.categories = data.results
      }
    });
  }

  eliminar(id: number | string) {
    Swal.fire({
      text: "¿Está seguro de querer eliminar la categoría?",
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
        this.categoriesSvc.deleteCategoria(id).subscribe({
          next: (data: any) => {
            Swal.fire({
              text: 'La categoría ha sido eliminada',
              icon: 'success',
              confirmButtonText: 'Continuar'
            }).then(() => {
              this.router.navigate(['/panel-control/categorias/ver-categorias']);
            })
          }
        })
      }
    })

    
  }

  ngOnInit(): void {
  }



}
