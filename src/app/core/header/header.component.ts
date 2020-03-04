import { Component } from "@angular/core";
import { UserService } from "../user/user.service";
import { Observable } from "rxjs";
import { User } from "../user/user";

@Component({
  selector: "ap-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent {
  // '$' é uma convenção para avisar que o valor guardará um observable
  user$: Observable<User>;
  user: User;

  constructor(userService: UserService) {
    this.user$ = userService.getUser();
    this.user$.subscribe(user => (this.user = user));
  }
}
