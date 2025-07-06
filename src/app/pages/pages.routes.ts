import { Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionusuariosComponent } from './gestionusuarios/gestionusuarios.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ExtintorComponent } from './extintor/extintor.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { InventarioComponent } from './inventario/inventario.component';
import { VentasComponent } from './ventas/ventas.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { RoleComponent } from './roles/roles.component';
import { ClienteComponent } from './cliente/cliente.component';

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
    path: 'empleado',
    component: EmpleadoComponent
  },
  {
    path: 'roles',
    component: RoleComponent
  },
  {
    path: 'proveedor',
    component: ProveedorComponent
  },
   {
    path: 'cliente',
    component: ClienteComponent
  },
  {
    path: 'extintor',
    component: ExtintorComponent
  },
  {
    path: 'calendario',
    component: CalendarioComponent
  },
  {
    path: 'recepcion',
    loadComponent: () => import('./recepcion/recepcion.component').then(m => m.RecepcionComponent)
  },
  {
    path: 'inventario',
    component: InventarioComponent
  } ,
  {
    path: 'ventas',
    component: VentasComponent
  }
];
