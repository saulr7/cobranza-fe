import { Component, OnInit } from '@angular/core';
import {SolicitudesService} from '../../services/solicitudes/solicitudes.service';
import {LoginService} from '../../services/login.service';
import {ISolicitud} from '../../models/solicitudes/solicitud';
import {Router} from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mis-solicitudes',
  templateUrl: './mis-solicitudes.component.html',
  styleUrls: ['./mis-solicitudes.component.css']
})
export class MisSolicitudesComponent implements OnInit {

  Titulo:string = "Mis solicitudes";
  estado :string = "pendiente";
  usuarioId:number = 0;
  solicitudes = []
  fechaDesde = {year : 1, month : 1,  day: 1};
  fechaHasta ;
  mostrarBtnFiltrarNombre:boolean = false;
  mostarFiltroFechas:boolean = false;
  cargando:boolean = true;
  hayDatosParaMostrar: boolean = true;

  constructor(
      private solicitudesService : SolicitudesService
    , private loginService : LoginService
    , private router : Router
  ) { }

  ngOnInit() {
    // this.obtener_usuario_logueado();
    // this.setear_fecha();
    // this.obtener_solicitudes();
    
  }



  obtener_solicitudes()
  {
    var fechaDesde = this.fechaDesde.year + "-" + this.fechaDesde.month + "-" +this.fechaDesde.day
    var fechaHasta = this.fechaHasta.year + "-" + this.fechaHasta.month + "-" +this.fechaHasta.day

    this.solicitudesService.solicitudes(this.usuarioId, fechaDesde, fechaHasta)
    .then((response)=>
    {

      this.solicitudes = []
      response.forEach(element => {
        var solicitud = new ISolicitud();
        solicitud.Id = element.Id
        solicitud.UsuarioSolicitanteId = element.UsuarioSolicitanteId
        solicitud.UsuarioSolicitante = element.UsuarioSolicitante
        solicitud.EstadoId = element.EstadoId
        solicitud.FechaCreado = element.FechaCreado
        solicitud.ElPaseEsDeHoy = element.ElPaseEsDeHoy
        solicitud.FechaCreado = element.FechaCreado
        solicitud.EsPaseRecurrente = element.EsPaseRecurrente
        this.solicitudes.push(solicitud)
      });
      if(this.solicitudes.length>0)
      {
        this.hayDatosParaMostrar = true
      }
      else
      {
        this.hayDatosParaMostrar = false
      }
      this.cargando = false;
      
    })
    .catch((err)=>
    {
      console.log(err);
      this.cargando = false;
      Swal("Ha sucedido un error al obtener las solicitudes, " + err.error.Message,"Error",'error') 
    })
  }


  obtener_usuario_logueado()
  {
    var payload = this.loginService.TokenPayload()
    this.usuarioId = payload.Id;
  }

  
  setear_fecha()
  {
    this.fechaDesde = {year : new Date().getFullYear(), month : new Date().getMonth()+1,  day: new Date().getDate()};
    this.fechaHasta = {year : new Date().getFullYear(), month : new Date().getMonth()+1,  day: new Date().getDate()};
  }


  cancelar_solicitud(solicitudId)
  {

    Swal({
      title: '¿Estas seguro de cancelar esta solicitud?',
      text: 'Esta acción no se puede revertir',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Cancelar',
      cancelButtonText: 'No',
      
    }).then((result) => {
      if (result.value) {
        this.cancelar(solicitudId)
       }

    })
  }


  cancelar(solicitudId)
  {
    this.solicitudesService.cancelar_solicitud(solicitudId)
    .then(()=>
    {
      Swal('Cancelada!','La solicitud ha sido cancelada.','success' )
      this.actualizar_estado(solicitudId, 4)
    
    })
    .catch((err)=>
    {
      console.log(err);
      Swal('Opps!','Hubo un problema al cancelar la solicitud. '+ err.error.Message || " ",'error' )
    })
  }

  actualizar_estado(solicitudId:number, estadoId:number)
  {

    this.solicitudes.forEach(solicitud => {
        if(solicitud.Id == solicitudId)
        {
          solicitud.EstadoId = estadoId
        }
    });
  }


  ver_solicitud(solicitudId:number, esSolicitudRecurrente : boolean )
  {
    if(esSolicitudRecurrente)
      this.router.navigate( ['/verSolicitud/:solicitudId/:recurrente', {solicitudId: solicitudId, recurrente: esSolicitudRecurrente }]);
    else
      this.router.navigate( ['/verSolicitud/:solicitudId/', {solicitudId: solicitudId } ]);
  }


}
