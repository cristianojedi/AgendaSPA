import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';

// bootstrap
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CustomFormsModule } from 'ng2-validation'

// componentes compartilhados
import { MenuSuperiorComponent } from './shared/menu-superior/menu-superior.component';
import { MainPrincipalComponent } from './shared/main-principal/main-principal.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MenuLoginComponent } from './shared/menu-login/menu-login.component';

// home
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// contatos
import { ListaContatosComponent } from './contatos/lista-contatos/lista-contatos.component';
import { InsereContatoComponent } from './contatos/insere-contato/insere-contato.component';

// usuário
import { InscricaoComponent } from './usuario/inscricao/inscricao.component';
import { LoginComponent } from './usuario/login/login.component';

// serviços
import { UsuarioService } from "./services/usuario.service";
import { AuthService } from "./contatos/services/auth.service";
import { ContatoService } from "./contatos/services/contato.service";

@NgModule({
  declarations: [
    AppComponent,
    MenuSuperiorComponent,
    MainPrincipalComponent,
    FooterComponent,
    HomeComponent,
    MenuLoginComponent,
    ListaContatosComponent,
    InscricaoComponent,
    LoginComponent,
    InsereContatoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CustomFormsModule,
    CarouselModule.forRoot(),
    RouterModule.forRoot(rootRouterConfig, { useHash: false })
  ],
  providers: [
    UsuarioService,
    AuthService,
    ContatoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
