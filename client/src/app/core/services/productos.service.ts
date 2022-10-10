import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto, ProductosResponse, ProductoInDB } from '@interfaces/producto';
import { prefix } from '@shared/data/ruta.api';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private urlEndPoint: string = prefix + 'product/'

  constructor(
    private http: HttpClient
  ) { }


  postProducto(body: Producto){
    return this.http.post<ProductoInDB>(this.urlEndPoint, body)
  }


  getAllProducts(){
    return this.http.get<ProductosResponse>(this.urlEndPoint)
  }


  getProduct(id: number){
    return this.http.get<ProductoInDB>(this.urlEndPoint+id)
  }


  putProduct(body: Producto, id: number){
    return this.http.put<ProductoInDB>(this.urlEndPoint+id, body)
  }
  

  deleteProduct(id: number){
    return this.http.delete(this.urlEndPoint+id)
  }

}
