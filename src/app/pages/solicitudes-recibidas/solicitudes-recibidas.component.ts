import { Component, OnInit } from '@angular/core';
import {SolicitudesService} from '../../services/solicitudes/solicitudes.service';
import {LoginService} from '../../services/login/login.service';
import {ISolicitud} from '../../models/solicitudes/solicitud';
import {EstadoSolicitud} from '../../models/solicitudes/estados';
import {EstadosObj} from '../../models/solicitudes/estadosObject';
import {AlertasService} from '../../services/alertas/alertas.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-solicitudes-recibidas',
  templateUrl: './solicitudes-recibidas.component.html',
  styleUrls: ['./solicitudes-recibidas.component.css']
})
export class SolicitudesRecibidasComponent implements OnInit {
 
  Titulo: string = "Solicitudes Recibidas";
  estado:string = "pendiente";
  usuarioId:number = 0;
  solicitudes = [];
  solicitudesCargadas = []
  fechaDesde = {year : 1, month : 1,  day: 1};
  fechaHasta:any ;
  estadoSeleccionado: number = 1;
  estados = EstadosObj
  txtcodigo:string = "" ;
  txtNombre:string = "";
  mostrarBtnFiltrarNombre:boolean;
  cargando : boolean = true;
  yaSeMostroAlerta : boolean = false
  hayDatosParaMostrar : boolean;
  mostarFiltroFechas : boolean = false

  constructor(
     private solicitudesService : SolicitudesService
    ,private loginService : LoginService
    ,private router : Router
    ,private alertasService : AlertasService
  ) { }

  ngOnInit() {
    this.setear_fecha();
    this.obtener_usuario_logueado();
    this.obtener_solicitudes_recibidas();
  }


    
  setear_fecha()
  {
    this.fechaDesde = {year : new Date().getFullYear(), month : new Date().getMonth()+1,  day: new Date().getDate()};
    this.fechaHasta = {year : new Date().getFullYear(), month : new Date().getMonth()+1,  day: new Date().getDate()};
  }


  obtener_usuario_logueado()
  {
    var payload = this.loginService.TokenPayload()
    this.usuarioId = payload.Id;
  }

  obtener_solicitudes_recibidas()
  {
    var fechaDesde = this.fechaDesde.year + "-" + this.fechaDesde.month + "-" +this.fechaDesde.day
    var fechaHasta = this.fechaHasta.year + "-" + this.fechaHasta.month + "-" +this.fechaHasta.day

    this.solicitudesService.solicitudes_recibidas(this.usuarioId, fechaDesde,fechaHasta)
    .then((response)=>
    {

      this.solicitudes = []
      response.forEach(element => {
        var solicitud = new ISolicitud();
        solicitud.Id = element.Id
        solicitud.UsuarioSolicitanteId = element.UsuarioSolicitanteId
        solicitud.UsuarioSolicitante = element.UsuarioSolicitante
        solicitud.EstadoId = element.EstadoId
        solicitud.ElPaseEsDeHoy = element.ElPaseEsDeHoy
        solicitud.FechaCreado = element.FechaCreado
        solicitud.EsPaseRecurrente = element.EsPaseRecurrente
        this.solicitudes.push(solicitud)
      });
      this.solicitudesCargadas = this.solicitudes;
      this.cargando = false;
      if(this.solicitudes.length>0)
      {
        this.hayDatosParaMostrar = true
      }
    })
    .catch((err)=>
    {
      console.log(err);
      this.cargando = false;
      Swal("Ha sucedido un error al obtener las solicitudes, " + err.error.Message,"Error",'error') 
    })
  }




  aprobar_solicitud(solicitudId, esSolicitudRecurrente)
  {
        Swal({
          title: '¿Aprobar solicitud  ?',
          text: 'Esta acción no se puede revertir',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aprobar',
          cancelButtonText: 'No',
          
        }).then((result) => 
        {
          if (result.value) 
          {
              this.solicitudesService.aprobar_solicitud(solicitudId, esSolicitudRecurrente)
              .then(()=>
              {
                Swal("La solicitud ha sido aprobada" ,"Éxito",'success') ;
                this.actualizar_estado(solicitudId, EstadoSolicitud.Aprobada)
              })
              .catch((err)=>
              {
                Swal("Ha sucedido un error al aprobar la solicitud, " + err.error.Message,"Error",'error') 
              })
          }
        })
  }


  
  denegar_solicitud(solicitudId, esSolicitudRecurrente)
  {
        Swal({
          title: '¿Denegar solicitud ?',
          text: 'Esta acción no se puede revertir',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          confirmButtonText: 'Denegar',
          cancelButtonText: 'No',
          
        }).then((result) => 
        {
            if (result.value) 
            {
              this.solicitudesService.denegar_solicitud(solicitudId, esSolicitudRecurrente)
              .then(()=>
              {
                Swal("La solicitud ha sido denegada" ,"Éxito",'success') ;
                this.actualizar_estado(solicitudId, EstadoSolicitud.Denegada)
              })
              .catch((err)=>
              {
                Swal("Ha sucedido un error al denegar la solicitud, " + err.error.Message,"Error",'error') 
              })
          }
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



  filtrar_datos(event: any) 
  { 

    this.txtNombre = this.txtNombre.toLowerCase();

    this.solicitudes = this.solicitudesCargadas.filter(s =>{

      if(s.UsuarioSolicitanteId.toString().indexOf(this.txtcodigo) > -1 
          && ( (this.estadoSeleccionado == -1 ? 1 : s.EstadoId == this.estadoSeleccionado) )
          &&  s.UsuarioSolicitante.toLowerCase().indexOf(this.txtNombre) > -1 )
      {
          return true
      }
    })
  }

  quitar_filtros()
  {
    this.mostrarBtnFiltrarNombre = false;
    this.solicitudes = this.solicitudesCargadas;
  }


  ver_solicitud(solicitudId:number, esSolicitudRecurrente : boolean )
  {
    if(esSolicitudRecurrente)
      this.router.navigate( ['/verSolicitud/:solicitudId/:recurrente', {solicitudId: solicitudId, recurrente: esSolicitudRecurrente }]);
    else
      this.router.navigate( ['/verSolicitud/:solicitudId/', {solicitudId: solicitudId } ]);
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
