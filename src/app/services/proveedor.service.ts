import { inject, Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Proveedor } from '../model/proveedor';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService extends GenericService<Proveedor> {

  private proveedorChange: Subject<Proveedor[]> = new Subject<Proveedor[]>();
  private messageChange: Subject<string> = new Subject<string>();

  constructor() {
    super(
      inject(HttpClient),
      `${environment.HOST}/proveedores`
    );
  }

  setProveedorChange(data: Proveedor[]) {
    this.proveedorChange.next(data);
  }

  getProveedorChange() {
    return this.proveedorChange.asObservable();
  }

  setMessageChange(data: string) {
    this.messageChange.next(data);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }
}
