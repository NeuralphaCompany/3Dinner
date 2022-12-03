import { Component, OnInit } from '@angular/core';
import { Venta, VentaInDB } from '@interfaces/venta';
import { VentasService } from '@services/ventas.service';
import { prefix } from '@shared/data/ruta.api';
import { interval, takeWhile } from 'rxjs';

@Component({
  selector: 'app-ventas-activas',
  templateUrl: './ventas-activas.component.html',
  styleUrls: ['./ventas-activas.component.scss']
})
export class VentasActivasComponent implements OnInit {

  public prefix = prefix;

  public ventas: VentaInDB[] = [];

  constructor(
    private ventasSvc: VentasService
  ) {
    this.ventasSvc.getActive().subscribe(
      (data : any) => {
        this.ventas = data.results
      }
    )

    setInterval(() => {
      this.ventasSvc.getActive().subscribe(
        (data : any) => {
          this.ventas = data.results
        }
      )
    }, 5 * 1000);
    

  }

  ngOnInit(): void {
    // this.ventasSvc.myWebSocket.asObservable().subscribe(
    //   (data) => {
    //     console.log(data)
    //     this.ventas = this.ventas.concat(data)
    //   }
    // )
  }

  submit() {
    // this.ventasSvc.myWebSocket.next(this.ventas[0])
  }

  estado(estado: string, id: number) {
    this.ventasSvc.putEstado(estado, id).subscribe(
      data => this.ventasSvc.getActive().subscribe(
        (data : any) => {
          this.ventas = data.results
        }
      )
    )
  }

}
