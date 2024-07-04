import { Component } from '@angular/core';
import { SignUp } from 'src/app/interfaces/sing-up';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss'],
})
export class SignupComponent {
  userReg!: SignUp;

  constructor(private authSrv: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.authSrv.signup(form.value).subscribe(
      (response) => {
        alert("Registrazione effettuata")
        console.log(response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}