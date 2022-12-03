import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { VentasService } from '@services/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  newMessage: string = '';
  messageList:  string[] = [];

  constructor(
    private ventasSvc: VentasService,
    private fb: FormBuilder
  ) { }

  form = this.fb.group({
    text: ['']
  })

  sendMessage() {
    console.log('mensaje')
    this.ventasSvc.myWebSocket.next({otracosa: 'Texto'})
  }
  ngOnInit() {
    this.ventasSvc
      .myWebSocket
      .asObservable()
      .subscribe((message: any) => {
        console.log(message)
        this.messageList.push(message);
      });
  }

}
