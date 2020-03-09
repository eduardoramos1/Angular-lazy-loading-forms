import { Injectable } from "@angular/core";
import { UserService } from "../user/user.service";
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
// Interface CanActivate permite  usar proteção de rota, neste algoritmo, caso o usuário esteja logado ele é redirecionado para outr página
// Caso CanActive retorne true, a rota protegida poderá ser acessada, caso false a rota não será renderizada
export class LoginGuard implements CanActivate {
	constructor(private userService: UserService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		if (this.userService.igLogged()) {
			this.router.navigate(["user", this.userService.getUserName()]);
			return false;
		}
		return true;
	}
}
