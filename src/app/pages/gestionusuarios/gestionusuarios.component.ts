import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-gestionusuarios',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, RouterModule],
  templateUrl: './gestionusuarios.component.html',
  styleUrl: './gestionusuarios.component.css'
})
export class GestionusuariosComponent {

  constructor (private router: Router) {}

  navegar(ruta: string) {
    this.router.navigate([ruta]);
  }
}
