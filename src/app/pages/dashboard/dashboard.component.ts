import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  username!: string;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
  const helper = new JwtHelperService();
  const token = sessionStorage.getItem(environment.TOKEN_NAME);

  if (token && token.split('.').length === 3) {
    const decodedToken = helper.decodeToken(token);
    this.username = decodedToken.sub;

    this.menuService.getMenusByUser(this.username).subscribe(data => {
      this.menuService.setMenuChange(data);
    });
  } else {
    console.warn('Token inválido o no encontrado');
  }
}

}
