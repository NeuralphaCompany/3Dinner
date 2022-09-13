import { Component, OnInit } from '@angular/core';
import { prefix } from '@shared/data/ruta.api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public prefix = prefix

  constructor() { }

  ngOnInit(): void {
  }

}
