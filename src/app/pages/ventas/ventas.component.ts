import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { Venta } from '../../model/venta';
import { VentaService } from '../../services/venta.service';
import { VentaEditComponent } from './ventas-edit/ventas-edit.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-ventas',
  standalone: true,
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class VentasComponent {
  dataSource: MatTableDataSource<Venta>;

  columnsDefinitions = [
    { def: 'idVenta', label: 'ID', hide: false },
    { def: 'total', label: 'Total', hide: false },
    { def: 'fechaVenta', label: 'Fecha', hide: false },
    { def: 'metodoPago', label: 'Método de Pago', hide: false },
    { def: 'idCliente', label: 'ID Cliente', hide: false },
    { def: 'idEmpleado', label: 'ID Empleado', hide: false },
    { def: 'actions', label: 'Acciones', hide: false },
    { def: 'detalles', label: 'Extintores Vendidos', hide: false }

  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private ventaService: VentaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.ventaService.findAll().subscribe(data => this.createTable(data));
    this.ventaService.getVentaChange().subscribe(data => this.createTable(data));
    this.ventaService.getMessageChange().subscribe(msg => {
      this.snackBar.open(msg, 'INFO', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    });
  }

  createTable(data: Venta[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  getDisplayedColumns(): string[] {
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  delete(id: number) {
    this.ventaService.delete(id)
      .pipe(switchMap(() => this.ventaService.findAll()))
      .subscribe(data => {
        this.ventaService.setVentaChange(data);
        this.ventaService.setMessageChange('Venta eliminada correctamente');
      });
  }

  openDialog(venta?: Venta) {
  const dialogRef = this.dialog.open(VentaEditComponent, {
    width: '700px',
    data: venta
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'updated' || result === 'created') {
      // Vuelve a cargar los datos
      this.ventaService.findAll().subscribe(data => {
        this.createTable(data);
      });
    }
  });
}

}
