import { Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionusuariosComponent } from './gestionusuarios/gestionusuarios.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ExtintorComponent } from './extintor/extintor.component';

export const pagesRoutes: Routes = [
  {
    path: '',
    redirectTo: 'bienvenida',
    pathMatch: 'full'
  },
  {
    path: 'bienvenida',
    component: BienvenidaComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'gestionusuarios',
    component: GestionusuariosComponent
  },
  {
    path: 'proveedor',
    component: ProveedorComponent
  },
  {
    path: 'extintor',
    loadComponent: () => import('./extintor/extintor.component').then(m => m.ExtintorComponent)
  },
  {
    path: 'recepcion',
    loadComponent: () => import('./recepcion/recepcion.component').then(m => m.RecepcionComponent)
  }
];