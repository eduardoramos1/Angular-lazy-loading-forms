import { Injectable } from "@angular/core";
import { SignUpService } from "./signup.service";
import { AbstractControl } from "@angular/forms";

import { debounceTime, switchMap, map, first } from "rxjs/operators";

@Injectable({
	providedIn: "root"
})
export class UserNotTakenValidatorService {
	constructor(private signUpService: SignUpService) {}

	checkUserNameTaken() {
		return (control: AbstractControl) => {
			// value changes retorna um observable
			// debounceTime permite que somente uma requisição seja feita dentro um determinado tempo
			// switchMap troca o Observable que deve ser observado, permitindo a continuação
			// map permite retorna o objeto que define o validator ou null
			// first pega o primeiro resultado de todo o processo anterior
			return control.valueChanges
				.pipe(debounceTime(300))
				.pipe(
					switchMap(userName =>
						this.signUpService.checkUserNameTaken(userName)
					)
				)
				.pipe(
					map(isTaken => (isTaken ? { userNameTaken: true } : null))
				)
				.pipe(first());
		};
	}
}
