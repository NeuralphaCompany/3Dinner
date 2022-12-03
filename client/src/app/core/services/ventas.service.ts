import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta, VentaInDB } from '@interfaces/venta'
import { prefix } from '@shared/data/ruta.api';
import { switchMap, tap } from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  urlEndpoint = prefix + 'venta/'

  constructor(
   private http: HttpClient
  ) { 
  }

  // myWebSocket: WebSocketSubject<any> = webSocket('ws://localhost:8000/api/v1/venta/ws/' );


  // socket = new WebSocket('ws://localhost:8000/api/v1/ventas/ws/')

  post(venta: Venta) {
    return this.http.post<VentaInDB>(this.urlEndpoint, venta).pipe(
      tap(
        (data) => {
          // this.myWebSocket.next(data)
        }
      )
    )
  }

  getActive() {
    return this.http.get(this.urlEndpoint + 'active')
  }

  getFactura(id: number) {
    return this.http.get(this.urlEndpoint + 'factura/' + id ,{ responseType: 'blob'})
  }

  putEstado(estado: string , id: number){
    return this.http.put(this.urlEndpoint + id, {estado: estado})
  }


  

}
