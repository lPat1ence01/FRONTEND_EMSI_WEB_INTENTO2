import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor } from '../../model/proveedor';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-recepcion',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
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
      next: (data) => {
        console.log('✅ Proveedores cargados:', data);
        this.proveedores = data;
      },
      error: (err) => console.error('❌ Error al cargar proveedores:', err)
    });
  }

  realizarRecepcion(): void {
    if (this.form.valid) {
      const datos = this.form.value;
      console.log('Recepción creada con:', datos);

      this.router.navigate(['/extintor'], {
        state: {
          fecha: datos.fecha,
          proveedorId: datos.proveedorId
        }
      });
    }
  }
}
