import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Proveedor } from '../../model/proveedor';
import { ProveedorService } from '../../services/proveedor.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { switchMap } from 'rxjs';
import { ProveedorDialogComponent } from './proveedor-dialog/proveedor-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proveedor',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent {
  dataSource: MatTableDataSource<Proveedor>;

  columnsDefinitions = [
    { def: 'idProveedor', label: 'ID', hide: true },
    { def: 'razonSocial', label: 'RAZÓN SOCIAL', hide: false },
    { def: 'ruc', label: 'RUC', hide: false },
    { def: 'direccion', label: 'DIRECCIÓN', hide: false },
    { def: 'numCelular', label: 'CELULAR', hide: false },
    { def: 'correo', label: 'CORREO', hide: false },
    { def: 'estado', label: 'ESTADO', hide: false },
    { def: 'actions', label: 'ACCIONES', hide: false }
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private proveedorService: ProveedorService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.proveedorService.findAll().subscribe(data => this.createTable(data));
    this.proveedorService.getProveedorChange().subscribe(data => this.createTable(data));
    this.proveedorService.getMessageChange().subscribe(msg => {
      this._snackBar.open(msg, 'INFO', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    });
  }

  createTable(data: Proveedor[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  getDisplayedColumns() {
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  delete(id: number) {
    this.proveedorService.delete(id)
      .pipe(switchMap(() => this.proveedorService.findAll()))
      .subscribe(data => {
        this.proveedorService.setProveedorChange(data);
        this.proveedorService.setMessageChange('Proveedor eliminado correctamente');
      });
  }

  openDialog(proveedor?: Proveedor) {
    this._dialog.open(ProveedorDialogComponent, {
      width: '750px',
      data: proveedor
    });
  }
}
