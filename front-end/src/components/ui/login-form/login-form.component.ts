import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  forma: FormGroup = new FormGroup({
    email: new FormControl(),
    lozinka: new FormControl()
  });

  public constructor(
    private loginService: LoginService,
    private router: Router

  ) { }

  // login() {
  //   if (this.forma.valid) {
  //     this.loginService.login({
  //       email: this.forma.value.email,
  //       lozinka: this.forma.value.lozinka
  //     }).subscribe(() => {
  //       const user = this.loginService.getUser();
  //       const roles = this.loginService.getRoles();
  //       const email = user.sub;

  //       if (roles.includes("ROLE_NASTAVNIK")) {
  //         this.loginService.getUserByEmail(email).subscribe(fullUser => {
  //           const id = fullUser.id;
  //           this.router.navigate([`/nastavnik/${id}/enastavnik`]);
  //         });
  //       } else if (roles.includes("ROLE_STUDENT")) {
  //         this.loginService.getUserByEmail(email).subscribe(fullUser => {
  //           const id = fullUser.id;
  //           this.router.navigate([`/student/${id}`]);
  //         });
  //       } else if (roles.includes("ROLE_STUDENTSKA_SLUZBA")) {
  //         this.loginService.getUserByEmail(email).subscribe(fullUser => {
  //           const id = fullUser.id;
  //           this.router.navigate([`osoblje/${id}/esluzba`]);
  //         });
  //       } else {
  //         this.router.navigate(['/']);
  //       }
  //     });
  //   }
  // }

  login() {
  if (this.forma.valid) {
    this.loginService.login({
      email: this.forma.value.email,
      lozinka: this.forma.value.lozinka
    }).subscribe(() => {
      const user = this.loginService.getUser();
      const roles = this.loginService.getRoles();

      console.log('Roles after login:', roles);

      if (!roles || roles.length === 0) {
        this.router.navigate(['/']);
        return;
      }

      if (roles.length === 1) {
        const role = roles[0];
        const email = user.sub;
        this.loginService.getUserByEmail(email).subscribe(fullUser => {
          const id = fullUser.id;

          if (role === "ROLE_NASTAVNIK") {
            this.router.navigate([`/nastavnik/${id}/enastavnik`]);
          } else if (role === "ROLE_STUDENT") {
            this.router.navigate([`/student/${id}`]);
          } else if (role === "ROLE_STUDENTSKA_SLUZBA") {
            this.router.navigate([`/osoblje/${id}/esluzba`]);
          } else if (role === "ROLE_ADMIN") {
            this.router.navigate([`/admin/${id}`]);
          } else {
            this.router.navigate(['/']);
          }
        });
      } else {
        this.router.navigate(['/izbor-uloge']);
      }
    });
  }
}


}
