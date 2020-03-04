import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

// permite ser usado em um pipe para pegar algum tipo de informação da requisiçao
import { tap } from "rxjs/operators";

const API_URL = "http://localhost:3000";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  authenticate(userName: string, password: string) {
    return this.http
      .post(
        `${API_URL}/user/login`,
        {
          userName,
          password
        },
        // permite que eu tenha acesso as informações da resposta
        { observe: "response" }
      )
      .pipe(
        tap(res => {
          const authToken = res.headers.get("x-access-token");
          console.log(authToken);
        })
      );
  }
}
