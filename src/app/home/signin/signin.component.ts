import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/auth/auth.service";
import { Router } from "@angular/router";
import { PlatformDetectorService } from "src/app/core/platform-detector/platform-detector.service";

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
		private router: Router,
		private platformDetectorService: PlatformDetectorService
	) {}

	ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			userName: ["", Validators.required],
			password: ["", Validators.required]
		});

		if (this.platformDetectorService.checkPlatformBrowser()) {
			// faz com que o elemento userNameInput receba foco
			this.userNameInput.nativeElement.focus();
		}
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

				// verifica a plataforma que o cliente ta usando, se for smartphone, o foco não acontece
				if (this.platformDetectorService.checkPlatformBrowser()) {
					// faz com que o elemento userNameInput receba foco
					this.userNameInput.nativeElement.focus();
				}

				// reseta todos os valores do formulario
				this.loginForm.reset();
			}
		);
	}
}
