import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html',
  styleUrls: ['./menu-login.component.css']
})
export class MenuLoginComponent implements OnInit {

  public nome: string = "";
  public email: string = "";

  constructor(private router: Router) { }

  ngOnInit() {

  }

  usuarioLogado(): Boolean {
    this.nome = localStorage.getItem('nome.usuario');
    this.email = localStorage.getItem('email.usuario');

    this.nome = this.nome !== null && this.nome !== '' ? this.nome : null;

    return this.email !== null;
  }

  logout() {
    localStorage.removeItem('nome.usuario');
    localStorage.removeItem('email.usuario');

    // navigateByUrl força a aplicação ser carregada novamente pela Url
    this.router.navigateByUrl('/');
  }
}
