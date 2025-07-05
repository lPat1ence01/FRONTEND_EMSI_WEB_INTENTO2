import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { GenericService } from './generic.service';
import { Extintor } from '../model/extintor';

@Injectable({
  providedIn: 'root'
})
export class ExtintorService extends GenericService<Extintor> {

  private extintorChange: Subject<Extintor[]> = new Subject<Extintor[]>();
  private messageChange: Subject<string> = new Subject<string>();

  constructor() {
    super(
      inject(HttpClient),
      `${environment.HOST}/extintores`  // Asegúrate que esta ruta coincida con tu backend
    );
  }

  // Emitir cambios en la lista de extintores
  setExtintorChange(data: Extintor[]) {
    this.extintorChange.next(data);
  }

  // Escuchar cambios en la lista de extintores
  getExtintorChange() {
    return this.extintorChange.asObservable();
  }

  // Emitir mensajes
  setMessageChange(data: string) {
    this.messageChange.next(data);
  }

  // Escuchar mensajes
  getMessageChange() {
    return this.messageChange.asObservable();
  }
}
