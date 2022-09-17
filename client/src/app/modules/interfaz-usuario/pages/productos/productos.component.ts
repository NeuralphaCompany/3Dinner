import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  private id = 0 

  constructor(
    private activeRoute: ActivatedRoute
  ) { 
    this.activeRoute.params.subscribe({
      next: (params:any) => {
        this.id  = params['id'];
      }
    })
  }

  ngOnInit(): void {
  }

}
