export interface Ficha {
    id?:number;
    nombre:string;
    fecha:string;
    email:string;
    finca:string;
    productor:string;
    location: {
        latitud: string;
        longitud: string;
      };
    analizada?:boolean;
}