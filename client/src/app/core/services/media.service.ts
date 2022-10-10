import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prefix } from '@shared/data/ruta.api';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  endpoint = prefix + 'media/images/'

  constructor(
    private http : HttpClient
  ) { }

  
  get_images(name: string) {
    return this.http.get(this.endpoint + '/' + name)
  }

  post_images(files: File[]) {

    let body = new FormData();

    for(const file of files) {
      body.append('files', file, file.name);
    }
    return this.http.post<any>(this.endpoint, body)
  }


}
