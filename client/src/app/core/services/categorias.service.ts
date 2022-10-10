import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductosResponse } from '@interfaces/producto';
import { prefix } from '@shared/data/ruta.api';
import { Category, CategoryInDB, CategoriesResponse } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private prefix = prefix + 'category/'

  constructor(
    private http: HttpClient
  ) { }

  getCategorias(){
    return this.http.get<CategoriesResponse>(this.prefix)
  }


  getCategoria(id: number){
    return this.http.get<CategoryInDB>(this.prefix+id)
  }


  postCategorias(category: Category){
    return this.http.post<CategoryInDB>(this.prefix, category)
  }


  updateCategoria(category: Category, id: number){
    return this.http.put(this.prefix+id, category)
  }


  deleteCategoria(id:number | string) {
    return this.http.delete(this.prefix + id)
  }

  getProducts(id: number){
    return this.http.get<ProductosResponse>(this.prefix + id + '/products')
  }
}
