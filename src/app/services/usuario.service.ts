import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

// import { Observable } from "rxjs/Observable";
import { Observable } from 'rxjs/Rx';

import { Usuario } from "../usuario/models/usuario";
import { Login } from "../usuario/models/login";
import { ServiceBase } from "../services/service.base";


@Injectable()
export class UsuarioService extends ServiceBase {

    constructor(private http: Http) {
        super();
    }

    adicionarUsuario(usuario: Usuario) : Observable<Usuario> {
        let response = this.http
            .post(this.UrlService + "Usuario", usuario, super.ObterHeaderJson())
            .map(super.extractData)
            .catch(super.serviceError)

        return response;
    }

    logar(login: Login) : Observable<Login> {
        let response = this.http
            .post(this.UrlService + "Usuario/login", login, super.ObterHeaderJson())
            .map(super.extractData)
            .catch(super.serviceError)

        return response;
    }
}