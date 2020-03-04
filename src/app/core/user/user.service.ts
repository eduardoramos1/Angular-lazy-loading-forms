import { Injectable } from "@angular/core";
import { TokenService } from "../token/token.service";
import { BehaviorSubject } from "rxjs";
import { User } from "./user";
import * as jwt_decode from "jwt-decode";

// por ter providedIn 'root', se este serviço tiver alguma coisa no constructor, ele sempre será chamado, independente de ter sido chamado ou não em um componente
@Injectable({
  providedIn: "root"
})
export class UserService {
  // behaviour subject emite logo de cara algum valor
  // se ninguém ouvir o valor emitido, ele vai manter este valor, permitindo que algum componente que seja renderizado depois deste serviço por exemplo consiga ter acesso a informação
  private userSubject = new BehaviorSubject<User>(null);

  constructor(private tokenService: TokenService) {
    //   se existir token, chame o decodeAndNotify ao carregar o serviço
    this.tokenService.hasToken() && this.decodeAndNotify();
  }

  setToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken();
    // jwt_decode vai decodificar o token e retornar um objeto
    // quando terminar de fazer o decode, passa as informações para o tipo User
    const user = jwt_decode(token) as User;
    // gera uma mensagem para todos que estiverem inscritos no subject com subscribe
    this.userSubject.next(user);
  }
}
