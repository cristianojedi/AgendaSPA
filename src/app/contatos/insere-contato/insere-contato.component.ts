import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControlName, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';

import { CustomValidators, CustomFormsModule } from 'ng2-validation'

import { Contato } from "../models/contato";
import { GenericValidator } from "../../utils/generic.form.validator";
import { ContatoService } from "../services/contato.service";

@Component({
  selector: 'app-insere-contato',
  templateUrl: './insere-contato.component.html',
  styleUrls: ['./insere-contato.component.css']
})
export class InsereContatoComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public insereContatoForm: FormGroup;
  public contato: Contato;
  public displayMessage: { [key: string]: string } = {};
  public errors: any[] = [];

  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private formBuilder: FormBuilder,
              private contatoService: ContatoService,
              private router: Router) {

    this.validationMessages = {
      nome: {
        required: 'O Nome é obrigatório',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 100 caracteres'
      },
      celular: {
        required: 'O Celular é obrigatório',
        rangeLength: 'O Celular deve conter 11 caracteres'
      },
      email: {
        required: 'O E-mail é obrigatório',
        email: 'O E-mail é inválido',
        minlength: 'O E-mail precisa ter no mínimo 6 caracteres',
        maxlength: 'O E-mail precisa ter no máximo 150 caracteres'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.contato = new Contato();
   }

  ngOnInit() {
    this.insereContatoForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      celular: ['', [Validators.required, CustomValidators.rangeLength([11, 11])]],
      email: ['', [Validators.required, CustomValidators.email, Validators.minLength(6), Validators.maxLength(150)]]
    })
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.insereContatoForm);
    });
  }

  inserirContato() {
    if (this.insereContatoForm.dirty && this.insereContatoForm.valid) {
      let contatoInserir = Object.assign({}, this.contato, this.insereContatoForm.value);

      this.contatoService.inserir(contatoInserir)
        .subscribe(
          result => { this.onSaveComplete(result) },
          error => { this.onErrorComplete(error) }
        );
    }
  }

  onSaveComplete(response: any): void {

    // Zera os dados do formulário
    this.insereContatoForm.reset();

    // Zera a coleção de erros
    this.errors = [];

    // Redireciona para a página Home
    this.router.navigate(['/contatos']);
  }

  onErrorComplete(error: any) {
    this.errors = JSON.parse(error._body).errors;
  }
}
