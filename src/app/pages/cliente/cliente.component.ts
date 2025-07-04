import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Cliente } from '../../model/cliente';
import { ClienteService } from '../../services/cliente.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { switchMap } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { ClienteDialogComponent } from './cliente-dialog/cliente-dialog.component';

@Component({
  selector: 'app-cliente',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInput,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    RouterOutlet,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  dataSource: MatTableDataSource<Cliente>;

  columnsDefinitions = [
    { def: 'idCliente', label: 'idCliente', hide: true },
    { def: 'nomCliente', label: 'nomCliente', hide: false },
    { def: 'tipoCliente', label: 'tipoCliente', hide: false },
    { def: 'tipoDocumento', label: 'tipoDocumento', hide: false },
    { def: 'numDocumento', label: 'numDocumento', hide: false },
    { def: 'numCelular', label: 'numCelular', hide: false },
    { def: 'correo', label: 'correo', hide: false },
    { def: 'actions', label: 'actions', hide: false }
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private clienteService: ClienteService, // inyecta el servicio
    private _dialog: MatDialog, // para abrir el modal
    private _snackBar: MatSnackBar // Notificaciones
  ) { }

  ngOnInit(): void {
    this.clienteService.findAll().subscribe(data => {
      this.createTable(data);
    });

    this.clienteService.getClienteChange().subscribe(data => this.createTable(data));

    this.clienteService.getMessageChange().subscribe(
      data =>
        this._snackBar.open(data, 'INFO',
          { duration: 2000, horizontalPosition: 'right', verticalPosition: 'bottom' }
        )
    );
  }

  // Método de creación de la tabla
  createTable(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Método para habilitar la búsqueda en la tabla
  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

  // Método para mostrar solo las columnas que no tienen el atributo hide=true
  getDisplayedColumns() {
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  // Metodo para elimar
  delete(id: number) {
    this.clienteService.delete(id)
      .pipe(switchMap(() => this.clienteService.findAll()))
      .subscribe(data => {
        this.clienteService.setClienteChange(data);
        this.clienteService.setMessageChange('Author DELETED!')
      })
  }

  // Metodo para abrir el modal
  openDialog(cliente?: Cliente) {
    this._dialog.open(ClienteDialogComponent, {
      width: '750px',
      data: cliente
    });
  }
}
