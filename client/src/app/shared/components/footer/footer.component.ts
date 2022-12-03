import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { SharedcomponentsService } from '@services/sharedcomponents.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterContentChecked {

  public total: number = 0;

  constructor(
    private sharedComponentsSvc: SharedcomponentsService,
    private modalSvc: DialogService
  ) {

  }

  ngOnInit(): void {

  }

  ngAfterContentChecked(): void {
    this.sharedComponentsSvc.refreshCarritoCookie()
    this.sharedComponentsSvc.total$.subscribe(total => this.total = total)
  }

  open(){
    this.modalSvc.open(CartComponent)
  }
}
