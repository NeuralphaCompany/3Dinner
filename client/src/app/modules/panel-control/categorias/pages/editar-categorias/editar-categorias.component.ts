import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '@interfaces/categoria';
import { CategoriasService } from '@services/categorias.service';
import { MediaService } from '@services/media.service';
import { prefix } from '@shared/data/ruta.api';
import { BehaviorSubject, catchError, Observable, switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-categorias',
  templateUrl: './editar-categorias.component.html',
  styleUrls: ['./editar-categorias.component.scss']
})
export class EditarCategoriasComponent implements OnInit {

  file: any | undefined;

  public prefix: string = prefix;

  public imageEdited: any;

  id = 0;

  constructor(
    private fb: UntypedFormBuilder,
    private mediaSvc: MediaService,
    private categoriasSvc: CategoriasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe({
      next: (paramId) => {
        this.id = paramId['id'];
        this.categoriasSvc.getCategoria(this.id).subscribe({
          next: (res: any) => {
            this.form.patchValue({
              name: res.name,
              image: res.image
            });
          }
        })
      }
    }

    )

  }

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    image: ['']
  })

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    let reader = new FileReader();
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      reader.readAsDataURL(this.file);
      reader.onload = ((_event: any) => {
        this.imageEdited = reader.result
      })
    }
  }

  updateCategoria() {
    let image = this.categoriasSvc.updateCategoria(this.form.value as Category, this.id);
    if (this.file){
    image = this.mediaSvc.post_images([this.file]).pipe(
        switchMap((data: any) => {
          if (data) {
            this.form.patchValue({
              image: data.names[0]
            });
          }
          return this.categoriasSvc.updateCategoria(this.form.value as Category, this.id);
        })
      );
    }
    image.subscribe(
      data => {
        Swal.fire(
          {
            title: 'La categoría se actualizó correctamente',
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

  submit(){
    Swal.fire({
      title: 'Actualizar categoría',
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
          this.updateCategoria()
        }
      })
    )
  }

}
