import { inject, Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Empleado } from '../model/empleado';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService extends GenericService<Empleado> {

  private empleadoChange: Subject<Empleado[]> = new Subject<Empleado[]>();
  private messageChange: Subject<string> = new Subject<string>();

  constructor() {
    super(
      inject(HttpClient),
      `${environment.HOST}/empleados` // Asegúrate que coincida con tu backend
    );
  }

  setEmpleadoChange(empleados: Empleado[]) {
    this.empleadoChange.next(empleados);
  }

  getEmpleadoChange() {
    return this.empleadoChange.asObservable();
  }

  setMessageChange(data: string) {
    this.messageChange.next(data);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }
}
