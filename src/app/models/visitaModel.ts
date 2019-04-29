import { IUsuario } from "./login/Usuario";
import { IPersona } from "./personaModel";

export class IVisita
{
    id: number
     UsuarioId : number
     NombreVisitante :  string  
     Descripcion :  string  
     Fecha_visita :  string 
     Hora_estimada_visita : string 
     createdAt :  string  
     updatedAt :  string
     usuarioId : number
     usuario : IUsuario
     persona : IPersona
}