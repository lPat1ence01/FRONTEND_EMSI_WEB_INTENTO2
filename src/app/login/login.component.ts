import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  login() {
    this.loginService.login(this.username, this.password).subscribe({
      next: (data) => {
        // console.log(data); // access_token
        sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);

        console.log(sessionStorage.getItem('access_token')); // debe mostrar el token

        this.router.navigate(['/pages/bienvenida']);
      },
      error: () => {
        alert('Usuario o contraseña incorrectos');
      }
    });
  }

}
