import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Inserisci email e password';
      return;
    }

    this.authService.login({ email: this.email, password: this.password }).subscribe(
      () => {
        // Login effettuato con successo
        this.errorMessage = '';
        this.router.navigate(['/home']); // Esempio: reindirizza alla home dopo il login
      },
      error => {
        // Gestione degli errori durante il login
        this.errorMessage = error;
      }
    );
  }
}
