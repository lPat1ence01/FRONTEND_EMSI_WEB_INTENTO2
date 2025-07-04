import { Component, Inject } from '@angular/core';
import { Cliente } from '../../../model/cliente';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../../../services/cliente.service';
import { switchMap } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cliente-dialog',
  imports: [
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './cliente-dialog.component.html',
  styleUrl: './cliente-dialog.component.css'
})
export class ClienteDialogComponent {
cliente: Cliente;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Cliente,
    private _dialogRef: MatDialogRef<ClienteDialogComponent>,
    private clienteService: ClienteService
  ){}

  ngOnInit(): void {
    this.cliente = {... this.data}; //spread operator
  }

  close(){
    this._dialogRef.close();
  }

  operate(){
    if(this.cliente != null && this.cliente.idCliente > 0){
      //UPDATE
      this.clienteService.update(this.cliente.idCliente, this.cliente)
        .pipe(switchMap ( () => this.clienteService.findAll()))
        .subscribe(data => {
          this.clienteService.setClienteChange(data);
          this.clienteService.setMessageChange('UPDATED!');
        });
    }else{
      //INSERT
      this.clienteService.save(this.cliente)
        .pipe(switchMap ( () => this.clienteService.findAll()))
        .subscribe(data => {
          this.clienteService.setClienteChange(data);
          this.clienteService.setMessageChange('CREATED!');
        });
    }

    this.close();
  }
}
