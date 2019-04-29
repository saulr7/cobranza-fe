export class IUsuario
{
     id : number 
     PersonaId : number 
     Usuario :  string  
     TipoUsuarioId : number
     tipo_usuario : {
         id : number 
         Descripcion :  string  
         Activo : boolean 
         createdAt :  string
         updatedAt : string
         deletedAt : string
    }
}