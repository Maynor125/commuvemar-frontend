export interface Workers {
    id:number,
    nombre:string,
    apellido:string,
    numeroTelefono:string,
    urlImg:ArrayBuffer | null | undefined | string,
}

export interface ProductorWorker {
  IDProductor:number,
  IDTrabajado:number,
}