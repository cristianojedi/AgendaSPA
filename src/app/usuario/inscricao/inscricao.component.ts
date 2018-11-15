import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormArray, FormControlName } from '@angular/forms';

import { Organizador } from '../models/organizador';
import { GenericValidator } from "../../utils/generic.form.validator";

// Foi necessário, para os imports abaixo, instalar: npm install --save rxjs-compat
// Foi necessário comentar a linha debaixo e usar a depois dela, pois estava dando erro:
// Observable.fromEvent is not a event
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { CustomValidators, CustomFormsModule } from 'ng2-validation'

@Component({
  selector: 'app-inscricao',
  templateUrl: './inscricao.component.html'
})
export class InscricaoComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public teste: string;

  public inscricaoFormGroup: FormGroup;

  // Objeto que representa os dados
  public organizador: Organizador;
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  public displayMessage: { [key: string]: string } = {};

  constructor(private formBuilder: FormBuilder) {
    
    this.validationMessages = {
      nome: {
        required: 'O Nome é obrigatório',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 100 caracteres'
      },
      cpf: {
        required: 'O CPF é obrigatório',
        rangeLength: 'O CPF deve conter 11 caracteres'
      },
      email: {
        required: 'O E-mail é obrigatório',
        email: 'O E-mail é inválido'
      },
      senha: {
        required: 'A Senha é obrigatória',
        minlength: 'A Senha precisa ter no mínimo 6 caracteres'
      },
      senhaConfirmacao: {
        required: 'A Senha Confirmação é obrigatória',
        minlength: 'A Senha Confirmação precisa ter no mínimo 6 caracteres',
        equalTo: 'A Senha Confirmação deve ser igual a Senha'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.organizador = new Organizador();
  }

  ngOnInit() {
    let senha = new FormControl('', [Validators.required, Validators.minLength(6)]);
    let senhaConfirmacao = new FormControl('', [Validators.required, Validators.minLength(6), CustomValidators.equalTo(senha)]);

    // Dados de preenchimento do formulário
    // Os campos abaixo são os itens do formulário
    this.inscricaoFormGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
        cpf: ['', [Validators.required, CustomValidators.rangeLength([11, 11])]],
        email: ['', [Validators.required, CustomValidators.email]],
        senha: senha,
        senhaConfirmacao: senhaConfirmacao
    })
  }

  // Esse método é executado logo após a renderização da view
  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.inscricaoFormGroup);
    });
  }

  adicionarOrganizador() {
    if (this.inscricaoFormGroup.dirty && this.inscricaoFormGroup.valid) {
      this.teste = "Formulário Ok!!!";
    } else {
      this.teste = "É, o bicho pegou!!!";
    }
  }
}
