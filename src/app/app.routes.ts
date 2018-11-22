import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from "./usuario/login/login.component";
import { ListaContatosComponent } from './contatos/lista-contatos/lista-contatos.component';
import { InscricaoComponent } from './usuario/inscricao/inscricao.component';
import { InsereContatoComponent } from './contatos/insere-contato/insere-contato.component';

import { AuthService } from "./contatos/services/auth.service";

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'contatos', canActivate: [AuthService], component: ListaContatosComponent },
    { path: 'inscricao', component: InscricaoComponent },
    { path: 'entrar', component: LoginComponent },
    { path: 'insere-contato', canActivate: [AuthService], component: InsereContatoComponent }
];
