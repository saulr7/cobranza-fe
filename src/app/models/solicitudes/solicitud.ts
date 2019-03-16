export class ISolicitud
{
    Id : number
    Estado: string
    EstadoId : number
    FechaCreado : Date
    HoraEntrada : Date
    HoraSalida: Date
    UsuarioAutoriza: string
    UsuarioAutorizaId : number
    UsuarioSolicitante: string  
    UsuarioSolicitanteId : number
    ElPaseEsDeHoy : boolean
    HoraSalidaMarca :string
    HoraEntradaMarca : string
    AreaSolicitante : string
    MotivoSalida : string
    Observaciones? : string
    PuestoSolicitante  : string
    UsuarioCrea :  string
    UsuarioCreaId : number
    MotivoSalidaId : string
    EsColaborador : boolean 
    Regresara : boolean
    EsPaseRecurrente : boolean
    
}