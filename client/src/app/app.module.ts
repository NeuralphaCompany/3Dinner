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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    RecuperarContrasenaComponent,
    HeaderComponent,
    FooterComponent,
    RegistrarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
