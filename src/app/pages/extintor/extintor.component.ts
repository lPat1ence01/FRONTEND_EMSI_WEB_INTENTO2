import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Extintor } from '../../model/extintor';
import { ExtintorService } from '../../services/extintor.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { switchMap } from 'rxjs';
import { ExtintorDialogComponent } from './extintor-dialog/extintor-dialog.component';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-extintor',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterOutlet,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatInput,
    MatFormFieldModule,
    MatTableModule
  ],
  templateUrl: './extintor.component.html',
  styleUrls: ['./extintor.component.css']
})
export class ExtintorComponent implements OnInit {

  dataSource: MatTableDataSource<Extintor> = new MatTableDataSource<Extintor>();
  today: Date = new Date(); // <----- FECHA ACTUAL

  columnsDefinitions = [
    { def: 'idExtintor', label: 'ID', hide: true },
    { def: 'tipoAgente', label: 'Agente', hide: false },
    { def: 'claseFuego', label: 'Clase', hide: false },
    { def: 'capacidadKG', label: 'Capacidad (KG)', hide: false },
    { def: 'fechaVencimiento', label: 'Vencimiento', hide: false },
    { def: 'estado', label: 'Estado', hide: false },
    { def: 'stock', label: 'Stock', hide: false },
    { def: 'actions', label: 'Actions', hide: false }
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private extintorService: ExtintorService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.extintorService.findAll().subscribe(data => {
      this.createTable(data);
    });

    this.extintorService.getExtintorChange().subscribe(data => this.createTable(data));

    this.extintorService.getMessageChange().subscribe(data =>
      this._snackBar.open(data, 'INFO', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      })
    );
  }

  createTable(data: Extintor[]) {
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
    this.extintorService.delete(id)
      .pipe(switchMap(() => this.extintorService.findAll()))
      .subscribe(data => {
        this.extintorService.setExtintorChange(data);
        this.extintorService.setMessageChange('Extintor eliminado!');
      });
  }

  openDialog(extintor?: Extintor) {
    this._dialog.open(ExtintorDialogComponent, {
      width: '750px',
      data: extintor
    });
  }

  finalizarRecepcion() {
    this.dataSource.data = [];
    this.extintorService.setExtintorChange([]);
    this.router.navigate(['/pages/recepcion'])
  }
}
