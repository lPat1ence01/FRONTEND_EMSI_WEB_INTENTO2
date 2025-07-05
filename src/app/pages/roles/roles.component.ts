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
import { Role } from '../../model/role';
import { RoleService } from '../../services/role.service';
import { RoleDialogComponent } from './roles-edit/roles-edit.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RoleComponent {
  dataSource: MatTableDataSource<Role>;

  columnsDefinitions = [
    { def: 'idRole', label: 'ID', hide: false },
    { def: 'name', label: 'Nombre', hide: false },
    { def: 'description', label: 'Descripción', hide: false },
    { def: 'actions', label: 'Acciones', hide: false }
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private roleService: RoleService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.roleService.findAll().subscribe(data => this.createTable(data));
    this.roleService.getRoleChange().subscribe(data => this.createTable(data));
    this.roleService.getMessageChange().subscribe(msg => {
      this.snackBar.open(msg, 'INFO', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    });
  }

  createTable(data: Role[]) {
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
    this.roleService.delete(id)
      .pipe(switchMap(() => this.roleService.findAll()))
      .subscribe(data => {
        this.roleService.setRoleChange(data);
        this.roleService.setMessageChange('Rol eliminado correctamente');
      });
  }

  openDialog(role?: Role) {
    this.dialog.open(RoleDialogComponent, {
      width: '600px',
      data: role
    });
  }
}
