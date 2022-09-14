import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prefix } from '@shared/data/ruta.api';
import { CategoryResponse } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private prefix = prefix + 'category/'

  constructor(
    private http: HttpClient
  ) { }

  getCategories(){
    return this.http.get<CategoryResponse>(this.prefix)
  }
}
