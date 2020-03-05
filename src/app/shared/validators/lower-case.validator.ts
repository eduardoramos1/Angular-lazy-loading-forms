import { AbstractControl } from "@angular/forms";

// control é o input que eu quero pegar
export function lowerCaseValidator(control: AbstractControl) {
  if (control.value.trim() && !/^[a-z]+[0-9]*$/.test(control.value)) {
    return { lowerCase: true };
  }

  return null;
}
