import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoCreate } from '@interfaces/empleado';
import { EmpleadosService } from '@services/empleados.service';
import { MediaService } from '@services/media.service';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-empleados',
  templateUrl: './crear-empleados.component.html',
  styleUrls: ['./crear-empleados.component.scss']
})
export class CrearEmpleadosComponent implements OnInit {

  public files: any | undefined;

  constructor(
    private fb: FormBuilder,
    private empleadoSvc: EmpleadosService,
    private mediaSvc: MediaService,
    private router: Router
  ) {

   }

  form = this.fb.group({
    email: ['', [Validators.minLength(3), Validators.maxLength(255)]],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    cellphone: ['', [Validators.maxLength(10), Validators.minLength(10)]],
    rol: [0],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
    confirmpassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
    is_superuser: [false, [Validators.required]],
    image: ['']
   })


  ngOnInit(): void {
  }

  submit(): void {
    let image = this.empleadoSvc.postEmpleado(this.form.value as EmpleadoCreate);
    if (this.files) {
      image = this.mediaSvc.post_images([this.files]).pipe(
        switchMap(
          (data: any) => {
            let image = data.names[0];
            this.form.patchValue({image: image});
            return this.empleadoSvc.postEmpleado(this.form.value as EmpleadoCreate);
          }
        )
      )
    }

    image.subscribe(
      data => {
        Swal.fire(
          {
            title: 'El empleado se registró correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'button is-success is-rounded'
            }
          }
        ).then((result) => {
          if (result.isConfirmed){
            this.router.navigate(['../../'])
          }
        })
      }
    )
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.files = event.target.files[0];
    }
  }

}
