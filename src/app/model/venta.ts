export interface DetalleVentaDTO {
  idExtintor: number;
  cantidad: number;
}

export class Venta {
  idVenta: number;
  total: number;
  fechaVenta: Date;
  metodoPago: string;
  idCliente: number;
  idEmpleado: number;
  detalles?: DetalleVentaDTO[];
}
