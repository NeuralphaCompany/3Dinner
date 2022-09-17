import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prefix } from '@shared/data/ruta.api';
import { Category, CategoryResponse } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private prefix = prefix + 'category'

  constructor(
    private http: HttpClient
  ) { }

  getCategorias(){
    return this.http.get<CategoryResponse>(this.prefix)
  }

  postCategorias(category:Category){
    return this.http.post<CategoryResponse>(this.prefix, category)
  }
}
