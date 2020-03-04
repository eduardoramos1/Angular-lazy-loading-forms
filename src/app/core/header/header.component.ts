import { Component } from "@angular/core";
import { UserService } from "../user/user.service";
import { Observable } from "rxjs";
import { User } from "../user/user";
import { Router } from "@angular/router";

@Component({
  selector: "ap-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent {
  // '$' é uma convenção para avisar que o valor guardará um observable
  user$: Observable<User>;

  constructor(private router: Router, private userService: UserService) {
    this.user$ = userService.getUser();
  }

  logout() {
    this.userService.logout();
    this.router.navigate([""]);
  }
}
