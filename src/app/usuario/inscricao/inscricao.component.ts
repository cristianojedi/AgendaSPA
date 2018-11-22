import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, ViewContainerRef } from '@angular/core';
import { ReactiveFormsModule, FormArray, FormBuilder, FormGroup, Validators, FormControl, FormControlName } from '@angular/forms';
import { Router } from "@angular/router";

// Foi necessário, para os imports abaixo, instalar: npm install --save rxjs-compat
// Foi necessário comentar a linha debaixo e usar a depois dela, pois estava dando erro:
// Observable.fromEvent is not a event
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import { Subscription } from 'rxjs/Subscription';

import { CustomValidators, CustomFormsModule } from 'ng2-validation'

import { Usuario } from '../models/usuario';
import { GenericValidator } from "../../utils/generic.form.validator";
import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: 'app-inscricao',
  templateUrl: './inscricao.component.html'
})
export class InscricaoComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public inscricaoFormGroup: FormGroup;

  // Objeto que representa os dados
  public usuario: Usuario;
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  public displayMessage: { [key: string]: string } = {};
  public errors: any[] = [];

  constructor(private formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router) {
    
    this.validationMessages = {
      nome: {
        required: 'O Nome é obrigatório',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 50 caracteres'
      },
      cpf: {
        required: 'O CPF é obrigatório',
        rangeLength: 'O CPF deve conter 11 caracteres'
      },
      email: {
        required: 'O E-mail é obrigatório',
        email: 'O E-mail é inválido',
        minlength: 'O E-mail precisa ter no mínimo 6 caracteres',
        maxlength: 'O E-mail precisa ter no máximo 150 caracteres'
      },
      senha: {
        required: 'A Senha é obrigatória',
        minlength: 'A Senha precisa ter no mínimo 6 caracteres',
        maxlength: 'A Senha precisa ter no máximo 20 caracteres'
      },
      senhaConfirmacao: {
        required: 'A Senha Confirmação é obrigatória',
        minlength: 'A Senha Confirmação precisa ter no mínimo 6 caracteres',
        maxlength: 'A Senha Confirmação precisa ter no máximo 20 caracteres',
        equalTo: 'A Senha Confirmação deve ser igual a Senha'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.usuario = new Usuario();
  }

  ngOnInit() {
    let senha = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]);
    let senhaConfirmacao = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20), CustomValidators.equalTo(senha)]);

    // Dados de preenchimento do formulário
    // Os campos abaixo são os itens do formulário
    this.inscricaoFormGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      cpf: ['', [Validators.required, CustomValidators.rangeLength([11, 11])]],
      email: ['', [Validators.required, CustomValidators.email, Validators.minLength(6), Validators.maxLength(150)]],
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

  adicionarUsuario() {
    if (this.inscricaoFormGroup.dirty && this.inscricaoFormGroup.valid) {
      // Pegar os dados do formulário(this.inscricaoFormGroup.value) e convertendo para this.usuario
      // Object.assign => copia os dados de um lado para o outro, isso é do javascript mesmo,
      // como se fosse o automapper mesmo, por isso, as propriedades devem ser iguais
      let usu = Object.assign({}, this.usuario, this.inscricaoFormGroup.value);

      this.usuarioService.adicionarUsuario(usu)
      .subscribe(
        result => { this.onSaveComplete(result) },
        error => { this.onErrorComplete(error) }
      );
    }
  }

  onSaveComplete(response: any): void {

    // Zera os dados do formulário
    this.inscricaoFormGroup.reset();

    // Zera a coleção de erros
    this.errors = [];

    // Grava o e-mail e o nome no localStorage
    localStorage.setItem('email.usuario', response.result.email);
    localStorage.setItem('nome.usuario', response.result.nome);

    // Redireciona para a página Home
    this.router.navigate(['/home']);
  }

  onErrorComplete(error: any) {
    this.errors = JSON.parse(error._body).errors;
  }
}
