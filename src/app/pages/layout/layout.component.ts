import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    RouterLink, RouterModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  ngAfterViewInit(): void {
    const hamburger = document.querySelector("#toggle-btn");
    const sidebar = document.querySelector("#sidebar");

    if (hamburger && sidebar) {
      hamburger.addEventListener("click", () => {
        sidebar.classList.toggle("expand");
      });
    }
  }
}
