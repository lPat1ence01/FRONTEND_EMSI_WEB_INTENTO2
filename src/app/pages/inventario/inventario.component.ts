import { Component, OnInit, ViewChild } from '@angular/core';
import { ExtintorService } from '../../services/extintor.service';
import { Extintor } from '../../model/extintor';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class InventarioComponent implements OnInit {

  displayedColumns: string[] = ['idExtintor', 'tipoAgente', 'claseFuego', 'capacidadKG', 'fechaVencimiento', 'estado', 'stock'];
  dataSource: MatTableDataSource<Extintor> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private extintorService: ExtintorService) {}

  ngOnInit(): void {
    this.extintorService.findAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportToPDF(): void {
    const originalTable = document.getElementById('pdfTable');

    if (originalTable) {
      // Clon limpio sin estilos conflictivos
      const clone = originalTable.cloneNode(true) as HTMLElement;
      clone.style.position = 'absolute';
      clone.style.top = '-9999px';
      clone.style.left = '-9999px';
      clone.style.background = 'white';
      clone.style.color = 'black';
      clone.style.fontSize = '12px';
      clone.style.fontFamily = 'Arial, sans-serif';

      // Limpiar clases problemáticas
      clone.querySelectorAll('*').forEach(el => {
        el.removeAttribute('class');
        el.removeAttribute('style');
      });

      document.body.appendChild(clone);

      html2canvas(clone).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
        pdf.save('InventarioExtintores.pdf');

        document.body.removeChild(clone);
      });
    }
  }
}
