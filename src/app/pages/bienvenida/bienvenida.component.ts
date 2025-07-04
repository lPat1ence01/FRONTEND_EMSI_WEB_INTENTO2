import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit, OnDestroy {
  nombreUsuario: string = '';
  rolUsuario: string = '';
  horaActual: string = '';
  fechaActual: string = '';
  intervalId: any;
  greeting: string = '';
  animatedValue: number = 0;
  animationInterval: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.nombreUsuario = sessionStorage.getItem('usuario') || 'Invitado';
    this.rolUsuario = sessionStorage.getItem('rol') || 'Visitante';
    
    this.updateTime();
    this.updateGreeting();
    this.intervalId = setInterval(() => {
      this.updateTime();
      this.updateGreeting();
    }, 1000);

    // Animación del valor numérico
    this.animateValue();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    clearInterval(this.animationInterval);
  }

  updateTime(): void {
    const ahora = new Date();
    this.horaActual = ahora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    this.fechaActual = ahora.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  updateGreeting(): void {
    const hours = new Date().getHours();
    if (hours < 12) {
      this.greeting = 'Buenos días';
    } else if (hours < 19) {
      this.greeting = 'Buenas tardes';
    } else {
      this.greeting = 'Buenas noches';
    }
  }

  animateValue(): void {
    const target = 100;
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    this.animationInterval = setInterval(() => {
      current += increment;
      this.animatedValue = Math.min(Math.floor(current), target);
      if (current >= target) {
        clearInterval(this.animationInterval);
      }
    }, stepTime);
  }

  irAlPanel(): void {
    this.router.navigate(['/pages/usuario']);
  }
}