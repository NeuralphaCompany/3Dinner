import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '@interfaces/categoria';
import { CategoriasService } from '@services/categorias.service';
import { MediaService } from '@services/media.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-categorias',
  templateUrl: './crear-categorias.component.html',
  styleUrls: ['./crear-categorias.component.scss']
})
export class CrearCategoriasComponent implements OnInit {

  file: any | undefined

  constructor(
    private fb: FormBuilder,
    private mediaSvc: MediaService,
    private categoriasSvc: CategoriasService,
    private router: Router
  ) { 
    
  }

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    image: ['']
  })

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  submit() {
    this.mediaSvc.post_images([this.file]).subscribe(data => {
      this.form.patchValue({
        image: data.names[0],
      });
      this.categoriasSvc.postCategorias(this.form.value as Category).subscribe(
        data => {
          Swal.fire(
            {
              title: 'La categoría se creó correctamente',
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
