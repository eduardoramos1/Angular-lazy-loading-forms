import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/auth.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./signin.component.html"
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login() {
    const userName = this.loginForm.get("userName").value;
    const password = this.loginForm.get("password").value;

    this.authService.authenticate(userName, password).subscribe(
      () => {
        // navega para outra rota, no caso user/${userName}
        this.router.navigate(["user", userName]);
        console.log("autenticado");
      },
      err => {
        console.log(err);
        alert("Nome de usuário ou senha inválidos");
        // reseta todos os valores do formulario
        this.loginForm.reset();
      }
    );
  }
}
