import { Component, OnInit } from '@angular/core';
import { IPersona } from 'src/app/models/personaModel';
import { PersonaService } from 'src/app/services/persona.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { IVivienda } from 'src/app/models/viviendaModel';
import { ViviendaService } from 'src/app/services/vivienda.service';

@Component({
  selector: 'app-nueva-persona',
  templateUrl: './nueva-persona.component.html'
})
export class NuevaPersonaComponent implements OnInit {

  Titulo:string = "Nueva persona";
  persona = new IPersona();

  vivienda = new IVivienda();

  btnGuardarEnable:boolean = true;
  cargando: boolean = false

  constructor(
    private personaService : PersonaService,
    private viviendaService : ViviendaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.persona.Sexo = "M"
  }


  crear_persona()
  {
    

    if(!this.datos_nueva_persona())
      return

    this.cargando =true;
    this.btnGuardarEnable = false;

    this.personaService.nueva_persona(this.persona)
    .then((resp)=>
    {
      console.log(resp);
      var personaId = resp.id
      this.cargando =false;
      this.btnGuardarEnable = true;


      if(this.vivienda.Descripcion || this.vivienda.Direccion)
      {

        if(!this.validar_datos_nueva_vivienda())
          return

        this.vivienda.personaId = personaId

        this.viviendaService.nueva_vivienda(this.vivienda)
        .then((result) => {
            Swal("Datos guardados exitosamente","Éxito" ,'success') 
            this.router.navigate(["/personas"]);
        }).catch((err) => {
          Swal("Lo datos de la persona se han guardado exitosamente, pero ha habido un problema guardando los datos de la vivienda"
          ,"Éxito" ,'warning') 
          this.router.navigate(["/personas"]);
        });

      }
      else
      {
        Swal("Datos guardados exitosamente","Éxito" ,'success') 
        this.router.navigate(["/personas"]);
      }


    })
    .catch((err)=>
    { 
      this.cargando =false;
      this.btnGuardarEnable = true;
      console.log(err);
      Swal("No se han podido guardar los datos, " + err.error.message.name,"Error",'error') 

    })
  }


  datos_nueva_persona(): boolean
  {
    if(!this.persona.Nombre)
    {
      Swal("Es necesario el nombre","Atención" ,'warning') 
      return false;
    }

    if(!this.persona.Apellido)
    {
      Swal("Es necesario el apellido","Atención" ,'warning') 
      return false;
    }
   
    if(!this.persona.NoIdentidad)
    {
      Swal("Es necesario la identidad","Atención" ,'warning') 
      return false;
    }

    if(!this.persona.Direccion)
    {
      Swal("Es necesario la dirección","Atención" ,'warning') 
      return false;
    }
   

    return true

  }


  validar_datos_nueva_vivienda() : boolean
  {

    if(!this.vivienda.Descripcion )
    {
      Swal("Es necesario la descripción de la vivienda","Atención" ,'warning') 
      return false;

    }

    if(!this.vivienda.Direccion)
    {
      Swal("Es necesario la dirección de la vivienda","Atención" ,'warning') 
      return false;
    }

    return true

  }



}
