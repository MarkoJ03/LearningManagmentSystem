import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  forma: FormGroup = new FormGroup({
    korisnickoIme: new FormControl(),
    lozinka: new FormControl()
  });

  public constructor(private loginService: LoginService){}

  login() {
    if(this.forma.valid) {
      //umesto username verovatno cemo imati korisnickoIme
      //moguce je da cemo menjati
      this.loginService.login({
        "username": this.forma.value.korisnickoIme,
        "password": this.forma.value.lozinka
      }).subscribe(r => {
        console.log(this.loginService.getUser());
        console.log(this.loginService.getRoles());
      });
    }
  }
}
