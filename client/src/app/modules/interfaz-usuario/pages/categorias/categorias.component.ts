import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '@services/categorias.service';
import { prefix } from '@shared/data/ruta.api';
import { CategoriesResponse } from 'src/app/core/interfaces/categoria';
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
    private categoriesSvc: CategoriasService
  ) {
    this.categoriesSvc.getCategorias().subscribe({
      next: (data: CategoriesResponse) => {
        this.categories = data.results
      }
    });
  }

  ngOnInit(): void {
  }

}
