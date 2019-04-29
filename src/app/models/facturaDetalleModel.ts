
import { IServicio } from "./servicioModel";

export class IFacturaDetalle
{
    id : number
    FacturaId : number
    ServicioId :  number
    Valor : number
    createdAt :  string
    updatedAt :  string
    deletedAt : string
    servicioId : number
    facturaId : number
    servicio : IServicio[]
}