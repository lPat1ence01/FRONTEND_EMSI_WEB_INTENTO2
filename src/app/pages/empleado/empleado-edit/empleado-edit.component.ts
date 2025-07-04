import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { switchMap } from 'rxjs';
import { Empleado } from '../../../model/empleado';
import { EmpleadoService } from '../../../services/empleado.service';

@Component({
  selector: 'app-empleado-edit',
  standalone: true,
  imports: [
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './empleado-edit.component.html',
  styleUrl: './empleado-edit.component.css'
})
export class EmpleadoEditComponent {
  empleado!: Empleado;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Empleado,
    private _dialogRef: MatDialogRef<EmpleadoEditComponent>,
    private empleadoService: EmpleadoService
  ) {}

  ngOnInit(): void {
    this.empleado = { ...this.data };
  }

  close() {
    this._dialogRef.close();
  }

  operate() {
    if (this.empleado && this.empleado.idEmpleado > 0) {
      // UPDATE
      this.empleadoService.update(this.empleado.idEmpleado, this.empleado)
        .pipe(switchMap(() => this.empleadoService.findAll()))
        .subscribe(data => {
          this.empleadoService.setEmpleadoChange(data);
          this.empleadoService.setMessageChange('¡Empleado actualizado!');
        });
    } else {
      // INSERT
      this.empleadoService.save(this.empleado)
        .pipe(switchMap(() => this.empleadoService.findAll()))
        .subscribe(data => {
          this.empleadoService.setEmpleadoChange(data);
          this.empleadoService.setMessageChange('¡Empleado creado!');
        });
    }

    this.close();
  }
}
