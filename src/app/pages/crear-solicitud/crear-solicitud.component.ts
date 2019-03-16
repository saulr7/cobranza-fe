import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2'

import { HttpClient, HttpHeaders, HttpParams } from  '@angular/common/http';
import {IMotivosSalida} from '../../models/motivosSalida/MotivosSalida';
import {LoginService} from '../../services/login/login.service';
import { environment } from 'src/environments/environment.prod';
import {IUsuario} from '../../models/login/Usuario';
import {INuevaSolicitud} from '../../models/solicitudes/NuevaSolicitud';
import {IEmpleado} from '../../models/empleados/empleado';
import {EmpleadosService} from '../../services/empleados/empleados.service';
import {SolicitudesService} from '../../services/solicitudes/solicitudes.service';
import {AlertasService} from '../../services/alertas/alertas.service'
@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {

  buscarOtroColaborador:boolean = false;
  indicator: string = "funciona";
  cargando:boolean = false;
  cargandoUsuariosAprueban : boolean = false;
  cargandoColaboradores : boolean = false;
  txtTerminoBusqueda:string  = ""
  Titulo: string = "Nueva solicitud"
  Usuario = new IUsuario()
  NuevaSolicitud = new INuevaSolicitud();
  empleadoNombre:string = "";
  empleadoCodigo:number = 0;
  motivoSelected:number = -1 ;
  requiereObservacion:boolean=false;
  idUsuarioAutoriza:number = -1;
  txtComentario:string = "";
  chkRegresa:boolean = true;
  esPaseConcurrente : boolean = false;
  btnGuardarEnable: boolean = true;
  yaSeMostroAlerta: boolean = false;
  
  horaActual = new Date().getHours();
  minutosActuales = new Date().getMinutes();

  motivosSalida = []; 
  horaSalida = {hour: 13, minute: 30};
  horaEntrada = {hour: 13, minute: 30};
  meridian = true;
  mostrarSeccionHora : boolean = false

  empleados = [];
  empleadosCargados = [];
  colaboradoresAutorizan = []
  
  constructor(
    private http: HttpClient
    ,private router: Router
    ,private loginService : LoginService
    ,private empleadosService : EmpleadosService
    ,private solicitudesService: SolicitudesService
    ,private alertasService : AlertasService
  ) {
   }

  ngOnInit() {
    this.obtener_motivos_salida();
    this.setear_hora();
    this.obtener_usuario_logueado();
    this.obtener_colaboradores();
    this.validar_mostrar_alerta();
    // this.obtener_colaboradores_autorizan();

    }


  seleccionar_solicitante(empleado)
  {
    this.empleadoNombre = empleado.Nombre
    this.empleadoCodigo = empleado.Id

    this.empleados = this.empleadosCargados.filter(e => e.Id != this.empleadoCodigo);
    this.buscarOtroColaborador = false
    
    // this.obtener_colaboradores_autorizan();
    
  }

  obtener_motivos_salida()
  {
    var token = this.loginService.Token();
 
    var header = new HttpHeaders().set("Authorization", "Bearer " + token);
    this.http.get<any[]>( environment.baseURL + "/maestros/obtenerMotivosSalida", { headers : header}).toPromise().then((respons)=>
    {

      this.motivosSalida = []
      respons.forEach(element => {
        var motivo = new IMotivosSalida()
        motivo.Id = element.Id
        motivo.Descripcion = element.Descripcion
        motivo.ObservacionObligatoria = element.ObservacionObligatoria
        this.motivosSalida.push(motivo)
      });

    }).catch((error)=>
    {
      console.log(error);
      Swal("Ha habido un error al obtener los motivos de salida",'Error','error') 

    })
  }

  toggleMeridian() 
  {
    this.meridian = !this.meridian;
  }

  onKeydown(event) 
  {
    if (event.key === "Enter") 
      this.buscar_colaborador();
    
  }

  setear_hora()
  {
    var minutos = 0;
    if(this.minutosActuales < 50)
      minutos = this.minutosActuales + 10
    else
    minutos = this.minutosActuales + 1

    this.horaSalida.hour = this.horaActual;
    this.horaSalida.minute = minutos

    this.horaEntrada.hour = this.horaActual + 1;
    this.horaEntrada.minute = minutos;
  }

  formatear_fecha(hora:number, minutos: number): string
  {
    const fecha = new Date();
    var fechaFormateada = new Date(fecha.getFullYear(),fecha.getMonth(), fecha.getDate(), hora, minutos  );
    var fechaF = this.formatDate(fechaFormateada);

    fechaF = fechaF +" "+ hora + ":" + minutos + ":00";
    return fechaF;
  }

  formatDate(date) : string {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  guardar_solicitud()
  {
    
    try 
    {
      this.btnGuardarEnable = false;
      this.cargando = true;
  
      this.datos_nueva_solicitud();

      if(!this.validar_datos_solicitud())
        {
          this.btnGuardarEnable = true;
          this.cargando = false;
          return
        }
  
      this.solicitudesService.crear_solicitud(this.NuevaSolicitud)
      .then(()=>
      {
        Swal("Solicitud creada exitosamente",'Exito','success')   
        this.btnGuardarEnable = true;
        this.cargando = false;
        this.router.navigate(["/misSolicitudes"]);
      }).catch((err)=>
      {
        console.log(err);
        Swal("Algo ha salido mal al crear la solicitud: " +err.error.Message,'Error','error');
        this.btnGuardarEnable = true;
        this.cargando = false;
  
      })
  
    } 
    catch (error) 
    {
      console.log(error); 
      Swal("Algo ha salido mal, "+error ,'Atención','warning');
      this.btnGuardarEnable = true;
      this.cargando = false;
    }


   

  }

  datos_nueva_solicitud()
  {

    if(!this.horaSalida || this.horaSalida == null )
    {
      Swal("Debes seleccionar una hora válida 3",'Atención','warning');
      return false
    }

    if(!this.horaSalida.hour )
    {
      Swal("Debes seleccionar una hora válida 2",'Atención','warning');
      return false
    }


    this.NuevaSolicitud.idUsuarioCrea  = this.Usuario.Id
    this.NuevaSolicitud.idUsuarioSolicitante = this.empleadoCodigo
    this.NuevaSolicitud.idMotivoSalida = this.motivoSelected
    this.NuevaSolicitud.Observaciones = this.txtComentario
    this.NuevaSolicitud.Regresara  = this.chkRegresa
    this.NuevaSolicitud.HoraSalida = this.formatear_fecha(this.horaSalida.hour, this.horaSalida.minute )
    this.NuevaSolicitud.HoraEntrada = this.formatear_fecha(this.horaEntrada.hour, this.horaEntrada.minute )
    this.NuevaSolicitud.idUsuarioAutoriza = this.idUsuarioAutoriza

  }

  validar_datos_solicitud(): boolean
  {

    if(this.NuevaSolicitud.idMotivoSalida == -1)
      {
        Swal("No has seleccionado ningún motivo, Debes elegir un motivo",'Atención','warning') ;
        return false
      }

      if( this.requiereObservacion == true && ((!this.txtComentario) || this.txtComentario.length <6))
      {
        Swal(" Debes escribir un comentario válido",'Atención','warning') ;
        return false
      }

      if( !this.horaSalida.hour  )
      {
        Swal(" Debes seleccionar una hora válida",'Atención','warning') ;
        return false
      }

      // if(this.NuevaSolicitud.idUsuarioAutoriza == -1)
      // {
      //   Swal("Debes seleccionar un usuario para asignarle la solicitud",'Atención','warning') ;
      //   return false
      // }

      return true
  }

  obtener_usuario_logueado()
  {
    var payload = this.loginService.TokenPayload()
    this.Usuario.Nombre = payload.Nombre;
    this.Usuario.Id = payload.Id;
    this.empleadoNombre = this.Usuario.Nombre ;
    this.empleadoCodigo = this.Usuario.Id;
  }


  obtener_colaboradores()
  {
    this.empleadosService.colaboradores(this.empleadoCodigo)
    .then((respons)=>
    {
      this.empleados= [];
      this.empleadosCargados = [];
      respons.forEach(element => {
        var empleado = new IEmpleado()
        empleado.Id = element.ID
        empleado.Nombre = element.Nombre
        empleado.AreaId = element.AreaId
        empleado.PuestoId = element.PuestoId
        this.empleadosCargados.push(empleado);

        if(element.ID != this.empleadoCodigo)
          this.empleados.push(empleado)

      });

    })
    .catch(error=>
      {
        console.log(error);
      })
  }




  cambio_motivo(motivoId)
  {
    if(motivoId == -1)
    {
      this.requiereObservacion = false
      return
    }
    this.motivosSalida.forEach(motivo => {
      if(motivo.Id == motivoId)
      {
        this.requiereObservacion = motivo.ObservacionObligatoria
      }

      
    });
  }


  buscar_colaborador()
  {
    if(!this.txtTerminoBusqueda)  
        return
      this.cargandoColaboradores = true
      this.empleadosService.buscar_colaborador(this.txtTerminoBusqueda)
      .then((respons)=>
      {
        this.empleados= [];
        this.empleadosCargados = [];
        respons.forEach(element => {
          var empleado = new IEmpleado()
          empleado.Id = element.ID
          empleado.Nombre = element.Nombre
          empleado.AreaId = element.AreaId
          empleado.PuestoId = element.PuestoId
          this.empleadosCargados.push(empleado);

          if(element.ID != this.empleadoCodigo)
            this.empleados.push(empleado)

        });
        this.cargandoColaboradores = false;

      })
      .catch(error=>
        {
          console.log(error);
          this.cargandoColaboradores = false;
        })
  }



  obtener_colaboradores_autorizan()
  {

    this.empleadosService.colaboradores_autorizan(this.empleadoCodigo).then((respons)=>
    {
      this.cargandoUsuariosAprueban = true
      this.colaboradoresAutorizan= [];
      respons.forEach(element => {
        var empleado = new IEmpleado()
        empleado.Id = element.ID
        empleado.Nombre = element.Nombre
        empleado.AreaId = element.AreaId
        empleado.PuestoId = element.PuestoId
        
        if(element.ID != this.empleadoCodigo)
          this.colaboradoresAutorizan.push(empleado);
      });
      if(this.colaboradoresAutorizan.length ==0 )
      {
        Swal(
          "No se han encontrado usuarios que puedan aprobar solicitudes en tu área, comunicate con tu jefe inmeadiato",
          'Atención','error');
      }
      this.cargandoUsuariosAprueban = false
    })
    .catch(error=>
      {
        console.log(error);
        this.cargandoUsuariosAprueban = false
      })
  }

 
  validar_mostrar_seccion_asignar()
  {
    if(this.motivoSelected > -1 )
    {
      return true;

    }  
    else
    {
      this.idUsuarioAutoriza = -1
      return false;
    }
  }

  validar_mostrar_seccion_hora()
  {
    if(this.motivoSelected > -1 )
      return true;
    else
      return false;
  }


  validar_mostrar_seccion_guardar()
  {
    if(this.motivoSelected > -1 )
      return true;
    else
      return false;
  }


  cerrar_alerta()
  {
    this.alertasService.cerrar_alerta("alertaNuevaSolicitud")
  }


  validar_mostrar_alerta()
  {
    var yaSeMostro = this.alertasService.validar_mostrar_alerta("alertaNuevaSolicitud")
    this.yaSeMostroAlerta = yaSeMostro
  }

}
