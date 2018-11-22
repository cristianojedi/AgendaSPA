import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable()
export class AuthService implements CanActivate {

    constructor(private router: Router){ }

    public email: string;
    public senha: string;

    canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {

        this.email = localStorage.getItem('email.usuario');
        this.senha = localStorage.getItem('senha.usuario');

        if (!this.email) {
            this.router.navigate(['/entrar']);
            return false;
        }

        return true;
    }
}
