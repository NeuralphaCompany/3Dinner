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

  public isLoged = false;

  private subscriptionName!: Subscription;

  constructor(
    private authSvc: AuthService,
  ) { 
    this.isLoged = this.authSvc.isLoggedIn();
  }

  ngOnInit(): void {
    
  }

  logOut(){
    console.log('logOut')
    this.authSvc.logOut();
  }

  toggleMenu(e:any) {
    let menu = document.getElementById('navbarBasicExample')
    let burger = document.getElementById('burger')
    if(menu && burger) {
      menu.classList.remove('is-active');
      burger.classList.remove('is-active');
    }
  }

}
