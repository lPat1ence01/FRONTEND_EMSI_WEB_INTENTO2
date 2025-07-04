import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor } from '../../model/proveedor';

@Component({
  selector: 'app-recepcion',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.css']
})
export class RecepcionComponent implements OnInit {
  form: FormGroup;
  proveedores: Proveedor[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private proveedorService: ProveedorService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fecha: [null, Validators.required],
      proveedorId: [null, Validators.required]
    });

    this.proveedorService.findAll().subscribe({
      next: (data) => this.proveedores = data,
      error: (err) => console.error('Error al cargar proveedores:', err)
    });
  }

  realizarRecepcion(): void {
    if (this.form.valid) {
      const datos = this.form.value;

      // Aquí puedes hacer un POST al backend si lo deseas antes de redirigir
      console.log('Recepción creada con:', datos);

      this.router.navigate(['/extintor'], {
        state: { fecha: datos.fecha, proveedorId: datos.proveedorId }
      });
    }
  }
}
