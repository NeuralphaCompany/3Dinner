import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category, CategoriesResponse } from '@interfaces/categoria';
import { Producto } from '@interfaces/producto';
import { CategoriasService } from '@services/categorias.service';
import { MediaService } from '@services/media.service';
import { ProductosService } from '@services/productos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.scss']
})
export class CrearProductosComponent implements OnInit {

  files: any[] | undefined
  categorias: CategoriesResponse | undefined;
  items : string[] = []
  images: string[] = []

  constructor(
    private fb: FormBuilder,
    private mediaSvc: MediaService,
    private productoSvc: ProductosService,
    private categoriasSvc: CategoriasService,
    private router: Router
  ) { 
    this.categoriasSvc.getCategorias().subscribe(
      (res:CategoriesResponse) => {
        this.categorias = res
      }
    )
  }

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    short_description: ['', [Validators.minLength(0),Validators.maxLength(255)]],
    price: [NaN, [Validators.required, Validators.min(1)]],
    image_galery: [this.images],
    ingredients: [this.items],
    category_id: [NaN, [Validators.required]],
    BaseIVA: [NaN, [Validators.min(0),Validators.max(100)]]
  })
  

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.files = event.target.files;
    }
  }

  submit() {
    // console.log(this.form.value)
    this.mediaSvc.post_images(this.files!).subscribe(data => {
      this.form.patchValue({
        image_galery: data.names,
      });
      this.productoSvc.postProducto(this.form.value as Producto).subscribe(
        data => {
          Swal.fire(
            {
              title: 'el producto se creó correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'button is-success is-rounded'
              }
            }
          ).then((result) => {
            if (result.isConfirmed){
              this.router.navigate(['../'])
            }
          })
        }
      )
    })
  }

}
