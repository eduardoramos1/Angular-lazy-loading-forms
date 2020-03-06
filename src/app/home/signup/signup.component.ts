import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { lowerCaseValidator } from "src/app/shared/validators/lower-case.validator";
import { UserNotTakenValidatorService } from "./user-not-taken.validator.service";
import { NewUser } from "./new-user";
import { SignUpService } from "./signup.service";
import { Router } from "@angular/router";
import { PlatformDetectorService } from "src/app/core/platform-detector/platform-detector.service";

@Component({
	templateUrl: "./signup.component.html"
})
export class SignUpComponent implements OnInit {
	signUpForm: FormGroup;

	@ViewChild("inputEmail") inputEmail: ElementRef<HTMLInputElement>;

	constructor(
		private formBuilder: FormBuilder,
		private userNotTakenValidatorService: UserNotTakenValidatorService,
		private signupService: SignUpService,
		private router: Router,
		private platformDetectorService: PlatformDetectorService
	) {}

	ngOnInit(): void {
		this.signUpForm = this.formBuilder.group({
			email: ["", [Validators.required, Validators.email]],
			fullName: [
				"",
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(40)
				]
			],
			userName: [
				"",
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(30),
					lowerCaseValidator
				],
				// checkUserNameTaken retorna uma função de validator
				// terceiro parametro do validator recebe um validator assincrono
				this.userNotTakenValidatorService.checkUserNameTaken()
			],
			password: [
				"",
				[
					Validators.required,
					Validators.minLength(4),
					Validators.maxLength(14)
				]
			]
		});

		if(this.platformDetectorService.checkPlatformBrowser()) {
			this.inputEmail.nativeElement.focus()
		}
	}

	signUp() {
		// pega os dados do formulário e o tipa com NewUser
		const newUser = this.signUpForm.getRawValue() as NewUser;
		this.signupService.signup(newUser).subscribe(
			() => {
				this.router.navigate([""]);
			},
			err => console.log(err)
		);
	}
}
