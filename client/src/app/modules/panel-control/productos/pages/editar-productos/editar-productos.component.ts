import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesResponse } from '@interfaces/categoria';
import { Producto, ProductoInDB } from '@interfaces/producto';
import { CategoriasService } from '@services/categorias.service';
import { MediaService } from '@services/media.service';
import { ProductosService } from '@services/productos.service';
import { prefix } from '@shared/data/ruta.api';
import { switchMap } from 'rxjs';
import SwiperCore, { Pagination, Swiper } from 'swiper'
import Swal from 'sweetalert2';

SwiperCore.use([Pagination])

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.scss']
})
export class EditarProductosComponent implements OnInit {

  public prefix = prefix;
  public files: any[] = [];
  public product: ProductoInDB | undefined;
  public categorias: CategoriesResponse | undefined;
  public items: string[] = [];
  public images: string[] = [];
  public uploadedImages: any[] = [];

  private id = 0;

  @ViewChild('swiper') swiper!: Swiper;

  constructor(
    private fb: FormBuilder,
    private mediaSvc: MediaService,
    private productoSvc: ProductosService,
    private categoriasSvc: CategoriasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    this.categoriasSvc.getCategorias().subscribe(
      (res: CategoriesResponse) => {
        this.categorias = res
      }
    )

    const productos$ = this.activatedRoute.params.pipe(
      switchMap(
        params => {
          this.id = params['id']
          return this.productoSvc.getProduct(params['id'])
        }
      )
    )

    productos$.subscribe(
      (data: ProductoInDB) => {
        this.form.patchValue(data)
        this.product = data
      }
    )
  }

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    short_description: ['', [Validators.minLength(0), Validators.maxLength(255)]],
    price: [NaN, [Validators.required, Validators.min(0), Validators.max(2e32)]],
    image_galery: [this.images],
    ingredients: [this.items],
    category_id: [NaN, [Validators.required]],
    BaseIVA: [NaN, [Validators.min(0), Validators.max(100)]]
  })


  ngOnInit(): void {
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      for (let file of event.target.files) {
        this.files.push(file)
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ((_event: any) => {
          this.uploadedImages.push(reader.result)
        })
      }
    }
  }

  removeImageFromBack(i: number) {
    this.product?.image_galery.splice(i, 1)
  }

  removeImageUploaded(i: number) {
    this.files.splice(i, 1)
    this.uploadedImages.splice(i, 1)
  }

  updateProducto() {
    this.form.patchValue({
      image_galery: this.product?.image_galery
    })

    let images = this.productoSvc.putProduct(this.form.value as Producto, this.id)

    if (this.files.length > 0) {
      images = this.mediaSvc.post_images(this.files).pipe(
        switchMap(
          (data: any) => {
            let images = this.product?.image_galery.concat(data.names)
            this.form.patchValue({
              image_galery: images
            })
            return this.productoSvc.putProduct(this.form.value as Producto, this.id)
          }
        )
      )
    }
    images.subscribe(
      data => {
        Swal.fire(
          {
            title: 'El producto se actualizó correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'button is-success is-rounded'
            }
          }
        ).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['../'])
          }
        })
      }
    )

  }

  submit() {
    Swal.fire({
      title: 'Actualizar producto',
      icon: 'warning',
      text: 'Los cambios no podrán ser revertidos',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      buttonsStyling: false,
      showCancelButton: true,
      customClass: {
        confirmButton: 'button is-danger is-rounded',
        cancelButton: 'button ml-2 is-dark is-rounded is-outlined'
      }
    }).then(
      ((result) => {
        if (result.isConfirmed){
          this.updateProducto()
        }
      })
    )
  }
}
