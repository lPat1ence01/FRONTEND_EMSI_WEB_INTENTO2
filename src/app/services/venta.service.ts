import { Injectable, inject } from '@angular/core';
import { Venta } from '../model/venta';
import { GenericService } from './generic.service';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentaService extends GenericService<Venta> {

  private ventaChange = new Subject<Venta[]>();
  private messageChange = new Subject<string>();

  constructor() {
    super(
      inject(HttpClient),
      `${environment.HOST}/ventas`  // Asegúrate que coincida con tu backend
    );
  }

  setVentaChange(data: Venta[]) {
    this.ventaChange.next(data);
  }

  getVentaChange() {
    return this.ventaChange.asObservable();
  }

  setMessageChange(data: string) {
    this.messageChange.next(data);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }
}
