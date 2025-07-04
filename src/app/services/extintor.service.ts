import { inject, Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Extintor } from '../model/extintor';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExtintorService extends GenericService<Extintor> {

  private extintorChange: Subject<Extintor[]> = new Subject<Extintor[]>();
  private messageChange: Subject<string> = new Subject<string>();

  constructor() {
    super(
      inject(HttpClient),
      `${environment.HOST}/extintores`
    );
  }

  // Para emitir lista actualizada
  setExtintorChange(data: Extintor[]) {
    this.extintorChange.next(data);
  }

  getExtintorChange() {
    return this.extintorChange.asObservable();
  }

  // Para emitir mensajes
  setMessageChange(data: string) {
    this.messageChange.next(data);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }

  // Para registrar múltiples extintores de una recepción
  registrarRecepcionAgrupada(extintores: any[]) {
    return this.http.post(`${environment.HOST}/extintores/recepcion-agrupada`, extintores);
  }
}
