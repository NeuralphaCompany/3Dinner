import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { prefix } from '@shared/data/ruta.api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public prefix = prefix;

  isLoged = false;

  private subscriptionName!: Subscription;

  constructor(
    private authSvc: AuthService,
  ) { 
    this.authSvc.Logged.subscribe(() => this.ngOnInit());
  }

  ngOnInit(): void {
    this.isLoged = this.authSvc.isLoggedIn();
  }

  logOut(){
    console.log('logOut')
    this.authSvc.logOut();
  }

}
