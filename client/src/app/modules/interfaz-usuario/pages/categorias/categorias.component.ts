import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '@services/categorias.service';
import { prefix } from '@shared/data/ruta.api';
import { CategoryResponse } from 'src/app/core/interfaces/categoria';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  public prefix = prefix

  categories: any[] = [
  ];

  constructor(
    private categoriesSvc : CategoriasService
  ) { 
    this.categoriesSvc.getCategories().subscribe({
      next: (data : CategoryResponse) => {
        this.categories = data.results
      },
      error: (err:any) => {
        Swal.fire({
          title: 'Algo malo pasó',
          text: err.detail,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    });
  }

  ngOnInit(): void {
  }

}
