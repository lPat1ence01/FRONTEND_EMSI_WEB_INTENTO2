import { Component, Inject } from '@angular/core';
import { Extintor } from '../../../model/extintor';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExtintorService } from '../../../services/extintor.service';
import { switchMap } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-extintor-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './extintor-dialog.component.html',
  styleUrl: './extintor-dialog.component.css'
})
export class ExtintorDialogComponent {
  extintor: Extintor;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Extintor,
    private _dialogRef: MatDialogRef<ExtintorDialogComponent>,
    private extintorService: ExtintorService
  ) {}

  ngOnInit(): void {
    this.extintor = { ...this.data }; // Copia el objeto recibido
  }

  close() {
    this._dialogRef.close();
  }

  operate() {
    if (this.extintor && this.extintor.idExtintor > 0) {
      // UPDATE
      this.extintorService.update(this.extintor.idExtintor, this.extintor)
        .pipe(switchMap(() => this.extintorService.findAll()))
        .subscribe(data => {
          this.extintorService.setExtintorChange(data);
          this.extintorService.setMessageChange('Extintor actualizado!');
        });
    } else {
      // INSERT
      this.extintorService.save(this.extintor)
        .pipe(switchMap(() => this.extintorService.findAll()))
        .subscribe(data => {
          this.extintorService.setExtintorChange(data);
          this.extintorService.setMessageChange('Extintor creado!');
        });
    }

    this.close();
  }
}
