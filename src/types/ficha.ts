import { string } from "zod";

export interface Ficha {
  id?: number;
  nombre: string;
  fecha: string;
  email: string;
  urlmagen: string;
  finca: string;
  productor: string;
  location: {
    latitud: string;
    longitud: string;
  };
  analizada?: boolean;
}

export interface FichaHeader {
  productor: string;
  cedula: string;
  telefono: string;
  fechaInspeccion: string;
  codProductor: number;
  comunidad: string;
  finca: string;
  produccionultimoCiclo: string;
  estimadoCosecha: string;
  areaDesarrollo: string;
  areaProduccion: string;
  ingresoCertificacion: string;
  estadoCertificacion: number;
  inspector: string;
}
