import { Component, OnInit } from '@angular/core';

import { Contato } from "../models/contato";
import { ContatoService } from "../services/contato.service";

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.css']
})
export class ListaContatosComponent implements OnInit {

  public contatos: Contato[];
  public errorMessage: string;

  constructor(private contatoService: ContatoService) { }

  ngOnInit() {
    this.listarContatos();
  }

  listarContatos() {
    this.contatoService.listar()
      .subscribe(
      contatos => this.contatos = contatos,
      error => this.errorMessage);
  }
}
