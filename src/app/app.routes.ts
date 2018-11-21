import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListaContatosComponent } from './contatos/lista-contatos/lista-contatos.component';
import { InscricaoComponent } from './usuario/inscricao/inscricao.component';
import { LoginComponent } from "./usuario/login/login.component";

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'contatos', component: ListaContatosComponent },
    { path: 'inscricao', component: InscricaoComponent },
    { path: 'entrar', component: LoginComponent }
];
