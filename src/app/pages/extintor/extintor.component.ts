import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Extintor } from '../../model/extintor';
import { ExtintorService } from '../../services/extintor.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-extintor',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './extintor.component.html',
  styleUrls: ['./extintor.component.css']
})
export class ExtintorComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private extintorService: ExtintorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      listaRecepcion: this.fb.array([this.createExtintorGroup()])
    });
  }

  createExtintorGroup(): FormGroup {
    return this.fb.group({
      tipoAgente: ['', Validators.required],
      claseFuego: [{ value: '', disabled: true }],
      capacidadKG: [0, [Validators.required, Validators.min(0.1)]],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      fechaVencimiento: ['', Validators.required]
    });
  }

  get listaRecepcion(): FormArray {
    return this.form.get('listaRecepcion') as FormArray;
  }

  addExtintor(): void {
    this.listaRecepcion.push(this.createExtintorGroup());
  }

  removeExtintor(index: number): void {
    if (this.listaRecepcion.length > 1) {
      this.listaRecepcion.removeAt(index);
    }
  }

  onTipoAgenteChange(index: number): void {
    const tipoAgente = this.listaRecepcion.at(index).get('tipoAgente')?.value;
    this.listaRecepcion.at(index).get('claseFuego')?.setValue(tipoAgente);
  }

  registrarRecepcion(): void {
    if (this.form.valid) {
      const lista = this.form.getRawValue().listaRecepcion.map((item: any) => ({
        ...item,
        estado: 'Operativo',
        stock: item.cantidad
      }));

      this.extintorService.registrarRecepcionAgrupada(lista).subscribe(() => {
        this.router.navigate(['/extintor']);
      });
    }
  }
}
