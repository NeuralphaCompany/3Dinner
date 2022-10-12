import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpleadoCreate, EmpleadoInDB, EmpleadosResponse } from '@interfaces/empleado';
import { prefix } from '@shared/data/ruta.api';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private urlEndPoint = prefix + 'employee/'

  constructor(
    private http: HttpClient
  ) { }

  getEmpleados() {
    return this.http.get<EmpleadosResponse>(this.urlEndPoint)
  }


  getEmpleado(id: number = 0) {
    return this.http.get<EmpleadoInDB>(this.urlEndPoint + id)
  }


  postEmpleado(body: EmpleadoCreate) {
    return this.http.post<EmpleadoInDB>(this.urlEndPoint, body)
  }


  putEmpleado(body: EmpleadoCreate) {
    return this.http.post<EmpleadoInDB>(this.urlEndPoint, body)
  }


  deleteEmpleado(id:number) {
    return this.http.delete(this.urlEndPoint + id)
  }
}
