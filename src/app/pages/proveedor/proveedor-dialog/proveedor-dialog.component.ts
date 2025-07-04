import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Proveedor } from '../../../model/proveedor';
import { ProveedorService } from '../../../services/proveedor.service';
import { switchMap } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-proveedor-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './proveedor-dialog.component.html',
  styleUrls: ['./proveedor-dialog.component.css']
})
export class ProveedorDialogComponent {
  proveedor: Proveedor;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Proveedor,
    private _dialogRef: MatDialogRef<ProveedorDialogComponent>,
    private proveedorService: ProveedorService
  ) {}

  ngOnInit(): void {
    this.proveedor = { ...this.data }; // Clonación por spread
  }

  close() {
    this._dialogRef.close();
  }

  operate() {
    if (this.proveedor && this.proveedor.idProveedor > 0) {
      // UPDATE
      this.proveedorService.update(this.proveedor.idProveedor, this.proveedor)
        .pipe(switchMap(() => this.proveedorService.findAll()))
        .subscribe(data => {
          this.proveedorService.setProveedorChange(data);
          this.proveedorService.setMessageChange('Proveedor actualizado');
        });
    } else {
      // INSERT
      this.proveedorService.save(this.proveedor)
        .pipe(switchMap(() => this.proveedorService.findAll()))
        .subscribe(data => {
          this.proveedorService.setProveedorChange(data);
          this.proveedorService.setMessageChange('Proveedor creado');
        });
    }

    this.close();
  }
}
