import { Component, ViewChild } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../model/empleado';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { EmpleadoEditComponent } from './empleado-edit/empleado-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule, 
    MatIconModule, 
    MatInputModule,
    MatSortModule,
    MatSnackBarModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent {
  dataSource!: MatTableDataSource<Empleado>;

  columnsDefinitions = [
    { def: 'idEmpleado', label: 'idEmpleado', hide: true },
    { def: 'nomEmpleado', label: 'nomEmpleado', hide: false },
    { def: 'apeEmpleado', label: 'apeEmpleado', hide: false },
    { def: 'dni', label: 'dni', hide: false },
    { def: 'correo', label: 'correo', hide: false },
    { def: 'numCelular', label: 'numCelular', hide: false },
    { def: 'actions', label: 'actions', hide: false },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private empleadoService: EmpleadoService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.empleadoService.findAll().subscribe((data) => {
      this.createTable(data);
    });

    this.empleadoService.getEmpleadoChange().subscribe(data => this.createTable(data));

    this.empleadoService.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', { duration: 2000 }));
  }

  createTable(data: Empleado[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getDisplayedColumns() {
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  openDialog(empleado?: Empleado) {
    this._dialog.open(EmpleadoEditComponent, {
      width: '750px',
      data: empleado
    });
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  delete(id: number) {
    this.empleadoService.delete(id)
      .pipe(switchMap(() => this.empleadoService.findAll()))
      .subscribe(data => {
        this.empleadoService.setEmpleadoChange(data);
        this.empleadoService.setMessageChange('¡Empleado eliminado!');
      });
  }
}
