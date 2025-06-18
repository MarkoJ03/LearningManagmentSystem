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
  
  ){}

  login() {
    if(this.forma.valid) {
      this.loginService.login({
        "email": this.forma.value.email,
        "lozinka": this.forma.value.lozinka
      }).subscribe(r => {
        console.log(this.loginService.getUser());
        console.log(this.loginService.getRoles());
        this.router.navigate(['/']);
      });
    }
  }
}
