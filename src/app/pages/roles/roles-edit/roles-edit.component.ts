import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Role } from '../../../model/role';
import { RoleService } from '../../../services/role.service';
import { switchMap } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-role-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './roles-edit.component.html',
  styleUrls: ['./roles-edit.component.css']
})
export class RoleDialogComponent {
  role: Role = { idRole: 0, name: '', description: '' };

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Role,
    private dialogRef: MatDialogRef<RoleDialogComponent>,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.role = { ...this.data }; // Copia del objeto para evitar mutaciones
    }
  }

  close() {
    this.dialogRef.close();
  }

  operate() {
    if (this.role && this.role.idRole > 0) {
      this.roleService.update(this.role.idRole, this.role)
        .pipe(switchMap(() => this.roleService.findAll()))
        .subscribe(data => {
          this.roleService.setRoleChange(data);
          this.roleService.setMessageChange('Rol actualizado correctamente');
          this.close();
        });
    } else {
      this.roleService.save(this.role)
        .pipe(switchMap(() => this.roleService.findAll()))
        .subscribe(data => {
          this.roleService.setRoleChange(data);
          this.roleService.setMessageChange('Rol creado correctamente');
          this.close();
        });
    }
  }
}
