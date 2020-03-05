import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { lowerCaseValidator } from "src/app/shared/validators/lower-case.validator";
import { UserNotTakenValidatorService } from "./user-not-taken.validator.service";

@Component({
	templateUrl: "./signup.component.html"
})
export class SignUpComponent implements OnInit {
	signUpForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private userNotTakenValidatorService: UserNotTakenValidatorService
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
	}
}
