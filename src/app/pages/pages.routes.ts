import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RolesComponent } from "./roles/roles.component";
import { RolesEditComponent } from "./roles/roles-edit/roles-edit.component";
import { EmpleadoComponent } from "./empleado/empleado.component";
import { EmpleadoEditComponent } from "./empleado/empleado-edit/empleado-edit.component";
import { ClienteComponent } from "./cliente/cliente.component";
import { BienvenidaComponent } from "./bienvenida/bienvenida.component";
import { GestionusuariosComponent } from "./gestionusuarios/gestionusuarios.component";
import { ProveedorComponent } from "./proveedor/proveedor.component";

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
        path: 'roles',
        component: RolesComponent, children: [
            {
                path: 'new',
                component: RolesEditComponent
            },
            {
                path: 'edit/id',
                component: RolesEditComponent
            }
        ]
    },
    {
        path: 'empleado',
        component: EmpleadoComponent, children: [
            {
                path: 'new',
                component: EmpleadoEditComponent
            },
            {
                path: 'edit/id',
                component: EmpleadoEditComponent
            }
        ]
    },
    {
        path: "cliente", component: ClienteComponent
    },
    {
        path: "proveedor",
        component: ProveedorComponent
    }
]