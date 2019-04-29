import { Component, OnInit } from '@angular/core';
import {SolicitudesService} from '../../services/solicitudes/solicitudes.service';
import Swal from 'sweetalert2'
import {ActivatedRoute} from '@angular/router';
import {EstadoSolicitud} from '../../models/solicitudes/estados';
import {EmpleadosService} from '../../services/empleados/empleados.service';
import {IEmpleado} from '../../models/empleados/empleado';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.css']
})
export class VerSolicitudComponent implements OnInit {

  Titulo : string = "Ver solicitud"
  solicitud:any = []
  solicitudId:any = 0
  idUsuarioAutoriza:number = -1;
  mostrarSeccionAprobado : boolean = false
  esSolicitudRecurrente : any = false;
  reasignar: boolean = false;
  empleadoCodigo : number = 0;
  colaboradoresAutorizan = [];

  constructor(
      private solicitudesService: SolicitudesService
    , private route: ActivatedRoute
    , private empleadosService : EmpleadosService
    , private loginService : LoginService
  ) { }

  ngOnInit() 
  {
    this.solicitudId =  this.route.snapshot.paramMap.get("solicitudId")
    this.esSolicitudRecurrente = this.route.snapshot.paramMap.get("recurrente")
    this.obterner_info_solicitud()
    this.obtener_usuario_logueado();
    
  }


  obterner_info_solicitud()
  {

    this.solicitudesService.ver_solicitud(this.solicitudId, this.esSolicitudRecurrente)
    .then((response)=>
    {
      this.solicitud = response;
      console.log(this.solicitud);
      this.validar_mostrar_seccion_aprobado();
      this.obtener_colaboradores_autorizan();

    })
    .catch((err)=>
    {
      console.log(err);
      Swal("Ha sucedido un error al obtener los datos de la solicitud, " + err.error.Message,"Error",'error') 
    })

  }

  validar_mostrar_seccion_aprobado()
  {
    if(this.solicitud.EstadoId == EstadoSolicitud.Aprobada)    
      this.mostrarSeccionAprobado  = true

    if(this.solicitud.EstadoId == EstadoSolicitud.Salida)    
      this.mostrarSeccionAprobado  = true
    
      if(this.solicitud.EstadoId == EstadoSolicitud.Finalizada)    
      this.mostrarSeccionAprobado  = true
  }


  obtener_colaboradores_autorizan()
  {
    this.empleadosService.colaboradores_autorizan(this.solicitud.UsuarioSolicitanteId).then((respons)=>
    {
      this.colaboradoresAutorizan= [];
      respons.forEach(element => {
        var empleado = new IEmpleado()
        empleado.Id = element.ID
        empleado.Nombre = element.Nombre
        empleado.AreaId = element.AreaId
        empleado.PuestoId = element.PuestoId
        
        if(element.ID != this.solicitud.UsuarioSolicitanteId && element.ID != this.solicitud.UsuarioAutorizaId)
          this.colaboradoresAutorizan.push(empleado);
      });

    })
    .catch(error=>
      {
        console.log(error);
      })

  }

  toggle_editar_asignacion()
  {
    this.reasignar = !this.reasignar;
  }

  reasignar_solicitud()
  {
    if(this.idUsuarioAutoriza <0)
    {
      Swal("Debes seleccionar un colaborador para reasignar la solicitud","Atención",'warning') 
      return;
    }


    this.solicitudesService.reasignar_solicitud(this.solicitud.Id, this.idUsuarioAutoriza)
    .then(()=> 
    {
      Swal("La solicitud ha sido reasignada " ,"Éxito",'success') 
      this.obterner_info_solicitud();
      this.reasignar = false;
    })
    .catch((err)=>
    {
      Swal("Algo ha salido mal al reasignar la solicitud, " +err.error.Message,"Error",'error') 
    })
  }


  obtener_usuario_logueado()
  {
    var payload = this.loginService.TokenPayload()
    this.empleadoCodigo = payload.Id;
  }

}
