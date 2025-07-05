import { Component, Inject, OnInit } from '@angular/core';
import { Extintor } from '../../../model/extintor';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExtintorService } from '../../../services/extintor.service';
import { switchMap } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-extintor-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './extintor-dialog.component.html',
  styleUrl: './extintor-dialog.component.css'
})
export class ExtintorDialogComponent implements OnInit {
  extintor: Extintor;

  // Mapeo de tipoAgente → claseFuego
  agentClassMap: { [key: string]: string } = {
    'Agente Tipo A': 'Clase A',
    'Agente Tipo B': 'Clase B',
    'Agente Tipo C': 'Clase C',
    'Agente Tipo D': 'Clase D',
    'Agente Tipo K': 'Clase K'
  };

  agentTypes = Object.keys(this.agentClassMap);

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Extintor,
    private _dialogRef: MatDialogRef<ExtintorDialogComponent>,
    private extintorService: ExtintorService
  ) {}

  ngOnInit(): void {
    this.extintor = { ...this.data };
  }

  close() {
    this._dialogRef.close();
  }

  onAgenteChange(tipo: string) {
    this.extintor.tipoAgente = tipo;
    this.extintor.claseFuego = this.agentClassMap[tipo];
  }

  operate() {
    if (this.extintor && this.extintor.idExtintor > 0) {
      // UPDATE directo
      this.extintorService.update(this.extintor.idExtintor, this.extintor)
        .pipe(switchMap(() => this.extintorService.findAll()))
        .subscribe(data => {
          this.extintorService.setExtintorChange(data);
          this.extintorService.setMessageChange('Extintor actualizado!');
        });
      this.close();
    } else {
      // INSERT inteligente: buscar si ya existe uno igual
      this.extintorService.findAll().subscribe(extintores => {
        const existente = extintores.find(e =>
          e.tipoAgente === this.extintor.tipoAgente &&
          e.claseFuego === this.extintor.claseFuego &&
          e.capacidadKG === this.extintor.capacidadKG &&
          e.fechaVencimiento === this.extintor.fechaVencimiento
        );

        if (existente) {
          const actualizado = {
            ...existente,
            stock: existente.stock + this.extintor.stock
          };

          this.extintorService.update(actualizado.idExtintor, actualizado)
            .pipe(switchMap(() => this.extintorService.findAll()))
            .subscribe(data => {
              this.extintorService.setExtintorChange(data);
              this.extintorService.setMessageChange('Stock actualizado del extintor existente!');
            });
        } else {
          this.extintorService.save(this.extintor)
            .pipe(switchMap(() => this.extintorService.findAll()))
            .subscribe(data => {
              this.extintorService.setExtintorChange(data);
              this.extintorService.setMessageChange('Nuevo extintor creado!');
            });
        }

        this.close();
      });
    }
  }
}
