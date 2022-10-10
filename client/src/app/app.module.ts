import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './shared/pages/login/login.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { RecuperarContrasenaComponent } from './shared/pages/recuperar-contrasena/recuperar-contrasena.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { RegistrarUsuarioComponent } from './shared/pages/registrar-usuario/registrar-usuario.component';
import { CartComponent } from './shared/components/cart/cart.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorsInterceptor } from './core/interceptors/errors.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { DialogModule } from '@ngneat/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    RecuperarContrasenaComponent,
    HeaderComponent,
    FooterComponent,
    RegistrarUsuarioComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    DialogModule.forRoot()
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
