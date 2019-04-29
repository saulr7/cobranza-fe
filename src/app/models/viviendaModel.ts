import { IPersona } from "./personaModel";
import { IServicio } from "./servicioModel";

export class IVivienda
{
     id : number
     personaId : number
     Descripcion :  string
     Direccion : string
     UsuarioAgregaId : number
     activo : boolean
     createdAt :  string
     updatedAt :  string
     deletedAt : string
     persona : IPersona
     servicios_viviendas : IServicio[]
}