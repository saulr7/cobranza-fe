import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { IPersona } from 'src/app/models/personaModel';
import { IVivienda } from 'src/app/models/viviendaModel';
import { FacturasService } from 'src/app/services/facturas.service';
import { ViviendaService } from 'src/app/services/vivienda.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ITipoUsuario } from 'src/app/models/tipoUsuarioModel';
import { IUsuario } from 'src/app/models/usuarioModel';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html'
})
export class PersonaComponent implements OnInit {

  Titulo : string = "Persona"
  personaId: any
  persona = new IPersona();
  cargandoDatosPersonales: boolean = false;
  viviendas: IVivienda[] = [];
  hayDatosParaMostrar: boolean = true
  nuevaVivienda: boolean = false
  Usuario : IUsuario;
  vivienda = new IVivienda();
  crearUsuario: boolean = false;
  tieneUsuario: boolean = false;
  isAdmin: boolean = false;
  TipoUsuarios : ITipoUsuario[];
  nuevoUsuario = 2;

  constructor(
    private personaService : PersonaService,
    private route : ActivatedRoute,
    private facturaService : FacturasService,
    private viviendaService : ViviendaService,
    private usuarioService : UsuarioService,
    private loginService : LoginService

  ) { 
    this.isAdmin = loginService.IsAdmin();
  }

  ngOnInit() {
    this.personaId =  this.route.snapshot.paramMap.get("personaId")
    this.cargar_datos_persona();
    this.obtener_viviendas();
    this.obtener_facturas_pendientes();
    this.obtener_tipos_usuario();
    this.obtener_usuario();

  }


  obtener_viviendas()
  {
    this.viviendas = [];
    this.personaService.viviendas_by_persona(this.personaId)
    .then((viviendas) => {
        viviendas.forEach(vivienda => {
            this.viviendas.push(vivienda)
        });

        if(this.viviendas.length>0)
          this.hayDatosParaMostrar = true
        else
        this.hayDatosParaMostrar = false

    }).catch((err) => {
      Swal("Algo ha salido mal, " + err.error.message,"Error",'error') 
    });
    
  }

  cargar_datos_persona()
  {
    this.cargandoDatosPersonales = true
    this.personaService.buscar_persona_ById(this.personaId)
    .then((persona) => 
    {
        this.persona = persona
        this.cargandoDatosPersonales = false
    })
    .catch((err) => 
    {
      Swal("Algo ha salido mal, " + err.error.message,"Error",'error') 
      this.cargandoDatosPersonales = false
    });
  }

  obtener_facturas_pendientes()
  {
    this.facturaService.facturas_pendientes_vivienda(2)
    .then((result) => {
    }).catch((err) => {
        console.log(err);
    });
  }



  crear_nueva_vivienda()
  {

    this.vivienda.personaId = this.personaId

    this.viviendaService.nueva_vivienda(this.vivienda)
    .then((result) => {
        Swal("Datos guardados exitosamente","Éxito" ,'success') 
        this.nuevaVivienda = false
        this.obtener_viviendas();
    }).catch((err) => {
      console.log(err);
      Swal("Algo ha salido mal" ,"Error" ,'warning') 
    });

  }



  obtener_tipos_usuario()
  {

    this.usuarioService.tipo_usuarios()
    .then((tipoUsuario) => {
        this.TipoUsuarios = tipoUsuario
    }).catch((err) => {
        console.log(err);
    });
  }



  crear_nueva_usuario()
  {
    this.usuarioService.nuevo_usuario(this.personaId, this.nuevoUsuario)
    .then((result) => {
      Swal("Datos guardados exitosamente","Éxito" ,'success') 
      this.obtener_usuario();
      this.crearUsuario = false
    }).catch((err) => {
      console.log(err);
      Swal("Algo ha salido mal" ,"Error" ,'error') 
    });
  }


  obtener_usuario()
  {
    this.usuarioService.obtener_usuario_byPersona(this.personaId)
    .then((usuario) => {
      this.Usuario = usuario

      if(this.Usuario)
        this.tieneUsuario = true
      else
        this.tieneUsuario = false

    }).catch((err) => {
      console.log(err);
    });
  }


  eliminar_vivienda(viviendaId)
  {

    Swal({
      title: '¿Eliminar Vivienda ?',
      text: 'Esta acción no se puede revertir',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33c',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'No',
      
    }).then((result) => 
    {
      if (result.value) 
      {
        this.viviendaService.eliminar_vivienda(viviendaId)
        .then((result) => {
          Swal("Datos actualizados exitosamente" ,"Éxito",'success')
          this.obtener_viviendas();
          
        }).catch((err) => {
          console.log(err);
          Swal("Algo ha salido mal, " + err.error.message,"Error",'error') 
        });
      }
    })

  }



  eliminar_persona()
  {

      Swal({
        title: '¿Eliminar Persona ?',
        text: 'Esta acción no se puede revertir',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33c',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'No',
        
      }).then((result) => 
      {
        if (result.value) 
        {
          this.personaService.eliminar_persona(this.personaId)
          .then((result) => {
            Swal("Datos actualizados exitosamente" ,"Éxito",'success')
            window.history.back();
            
          }).catch((err) => {
            console.log(err);
            Swal("Algo ha salido mal, " + err.error.message,"Error",'error') 
          });
        }
      })
  }


}

