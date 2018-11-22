import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { Observable } from 'rxjs/Rx';

import { ServiceBase } from "../../services/service.base";
import { Contato } from "../models/contato";

@Injectable()
export class ContatoService extends ServiceBase {

    constructor(private http: Http) {
        super();
    }

    inserir(contato: Contato) : Observable<Contato> {
        let response = this.http
            .post(this.UrlService + 'Contato', contato, super.ObterHeaderJson())
            .map(super.extractData)
            .catch(super.serviceError);

        return response;
    }

    listar() {
        let response = this.http
            .get(this.UrlService + 'Contato', super.ObterHeaderJson())
            .map((res: Response) => <Contato[]>res.json())
            .catch(super.serviceError);

        return response;
    }
}