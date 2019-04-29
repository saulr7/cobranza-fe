
import { IVivienda } from "./viviendaModel";
import { IFacturaDetalle } from "./facturaDetalleModel";
import { IPersona } from "./personaModel";

export class IFacturaCompleta

{
    id : number
    ViviendaId :number
    Anio : number
    Mes : number
    UsuarioGeneraId : number
    ISV : number
    Otros : number
    OtrosCargos : number
    Descuento :number
    SubTotal : number
    Total : number
    FechaVence : string
    Pagada : boolean
    FormaPagoId : number
    FechaPago : string
    UsuarioRealizaCobroId : number 
    Anulada : boolean
    FechaAnulada : string
    UsuarioAnulaId : number
    MotivoAnulaId : number
    ComentarioAnula : string
    createdAt : string
    vivienda : IVivienda
    factura_detalles : IFacturaDetalle
    cajero : IPersona
}