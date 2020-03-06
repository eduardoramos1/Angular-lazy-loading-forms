import { Injectable } from "@angular/core";
import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpSentEvent,
	HttpHeaderResponse,
	HttpProgressEvent,
	HttpResponse,
	HttpUserEvent
} from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenService } from "../token/token.service";

// interceptor com objetivo de interceptar o token das requisições
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
	constructor(private tokenService: TokenService) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<
		| HttpSentEvent
		| HttpHeaderResponse
		| HttpProgressEvent
		| HttpResponse<any>
		| HttpUserEvent<any>
	> {
		// se estiver logado, adiciona no headers da requisição o token
		if (this.tokenService.hasToken()) {
			const token = this.tokenService.getToken();
			req = req.clone({
				setHeaders: {
					"x-access-token": token
				}
			});
		}

		// se não, mantém a requisição padrao
		return next.handle(req);
	}
}
