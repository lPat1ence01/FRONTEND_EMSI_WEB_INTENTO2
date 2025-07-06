import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Venta } from '../../../model/venta';
import { VentaService } from '../../../services/venta.service';
import { ExtintorService } from '../../../services/extintor.service';
import { Extintor } from '../../../model/extintor';
import { switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-venta-dialog',
  standalone: true,
  templateUrl: './ventas-edit.component.html',
  styleUrls: ['./ventas-edit.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class VentaEditComponent {
  venta: Venta;
  detalle = { idExtintor: 0, cantidad: 1 };
  detalles: { idExtintor: number; cantidad: number }[] = [];
  extintoresDisponibles: Extintor[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Venta,
    private dialogRef: MatDialogRef<VentaEditComponent>,
    private ventaService: VentaService,
    private extintorService: ExtintorService
  ) {}

  ngOnInit(): void {
    this.venta = { ...this.data };
    this.detalles = this.venta.detalles ? [...this.venta.detalles] : [];
    this.extintorService.findAll().subscribe(data => {
      this.extintoresDisponibles = data;
    });
  }

  agregarDetalle() {
    if (this.detalle.idExtintor && this.detalle.cantidad > 0) {
      this.detalles.push({ ...this.detalle });
      this.detalle = { idExtintor: 0, cantidad: 1 };
    }
  }

  eliminarDetalle(index: number) {
    this.detalles.splice(index, 1);
  }

  close() {
    this.dialogRef.close(); // Sin valor
  }

  operate() {
  this.venta.detalles = this.detalles;

  if (this.venta.idVenta > 0) {
    this.ventaService.update(this.venta.idVenta, this.venta)
      .subscribe(() => {
        this.ventaService.setMessageChange('Venta actualizada');
        this.dialogRef.close('updated'); // 👈 IMPORTANTE
      });
  } else {
    this.ventaService.save(this.venta)
      .subscribe(() => {
        this.ventaService.setMessageChange('Venta registrada');
        this.dialogRef.close('created'); // 👈 IMPORTANTE
      });
  }
}

}
