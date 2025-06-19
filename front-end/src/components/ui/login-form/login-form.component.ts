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

  login() {
    if (this.forma.valid) {
      this.loginService.login({
        email: this.forma.value.email,
        lozinka: this.forma.value.lozinka
      }).subscribe(() => {
        const user = this.loginService.getUser();
        const roles = this.loginService.getRoles();
        const email = user.sub;

        if (roles.includes("ROLE_NASTAVNIK")) {
          this.loginService.getUserByEmail(email).subscribe(fullUser => {
            const id = fullUser.id;
            this.router.navigate([`/nastavnik/${id}/enastavnik`]);
          });
        } else if (roles.includes("ROLE_STUDENT")) {
          this.loginService.getUserByEmail(email).subscribe(fullUser => {
            const id = fullUser.id;
            this.router.navigate([`/student/${id}`]);
          });
        } else {
          this.router.navigate(['/']);
        }
      });
    }
  }
}
