import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/auth.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./signin.component.html"
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;

  // permite acesso a um elemento do DOM, sem acessá-lo diretamente, como se fosse ao usar $() ou document.querySelector()
  @ViewChild("userNameInput") userNameInput: ElementRef<HTMLInputElement>;

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

        // faz com que o elemento userNameInput receba foco
        this.userNameInput.nativeElement.focus();
        // reseta todos os valores do formulario
        this.loginForm.reset();
      }
    );
  }
}
