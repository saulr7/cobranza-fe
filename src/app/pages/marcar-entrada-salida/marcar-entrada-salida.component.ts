import { Component, OnInit } from '@angular/core';
import {SolicitudesService} from '../../services/solicitudes/solicitudes.service';
import {ISolicitud} from '../../models/solicitudes/solicitud';
import Swal from 'sweetalert2'
import {EstadoSolicitud} from '../../models/solicitudes/estados';

@Component({
  selector: 'app-marcar-entrada-salida',
  templateUrl: './marcar-entrada-salida.component.html',
  styleUrls: ['./marcar-entrada-salida.component.css']
})
export class MarcarEntradaSalidaComponent implements OnInit {

  Titulo: string = "Marcar entrada y salida";

  solicitudes = [];
  txtTerminoBusqueda:string = "";
  cargando:boolean =true;
  chkSoloAprobadas: boolean = true;
  solicitudesCargadas = [];

  constructor(
    private solicitudesService : SolicitudesService
  ) { }

  ngOnInit() 
  {
    this.obtener_solicitudes();
  }




  obtener_solicitudes()
  {
    this.solicitudesService.obtener_solicitudes_de_hoy()
    .then((response)=>
    {
       this.cargando = true; 
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
        this.solicitudes.push(solicitud)
      });
      this.cargando = false;
      this.solicitudesCargadas = this.solicitudes;
      if(this.chkSoloAprobadas)
        {
          this.solicitudes = this.solicitudes.filter(s => 
            s.EstadoId ==  EstadoSolicitud.Aprobada  || s.EstadoId ==  EstadoSolicitud.Salida || 
            s.EstadoId ==  EstadoSolicitud.Finalizada 
            )
        }
    })
    .catch((err)=>
    {
      this.cargando = false;
      Swal("Ha sucedido un error al obtener las solicitudes, " + err.error.Message,"Error",'error') 
      console.log(err); 
    })
  }



  marcar_salida(solicitudId, nombreSolicitante)
  {
    Swal({
      title: '¿Marcar salida para: ' +nombreSolicitante +' ?',
      text: 'Esta acción no se puede revertir',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Marcar',
      cancelButtonText: 'No',
      
    }).then((result) => {
      if (result.value) {
        this.solicitudesService.solicitud_marcar_salida(solicitudId)
        .then(()=>
        {
          Swal("Salida marcada exitosamente " ,"Éxito",'success');
          this.obtener_solicitudes();
        })
        .catch((err)=>
        {
          Swal("Ha sucedido un error al marcar la salida, " + err.error.Message,"Error",'error') 
        })
       }

    })

 
  }


  marcar_entrada(solicitudId, nombreSolicitante)
  {

    Swal({
      title: '¿Marcar entrada para: ' +nombreSolicitante +' ?',
      text: 'Esta acción no se puede revertir',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Marcar',
      cancelButtonText: 'No',
      
        }).then((result) => {
          if (result.value) {
        this.solicitudesService.solicitud_marcar_entrada(solicitudId)
        .then(()=>
        {
          Swal("Entrada marcada exitosamente " ,"Éxito",'success');
          this.obtener_solicitudes()
        })
        .catch((err)=>
        {
          Swal("Ha sucedido un error al marcar la entrada, " + err.error.Message,"Error",'error') 
        })
      }
    })
  }



  filtrar_datos(event: any)
  {
    this.txtTerminoBusqueda = this.txtTerminoBusqueda.toLowerCase()

    var buscarPorCodigo = this.isNumeric(this.txtTerminoBusqueda)

    this.solicitudes = this.solicitudesCargadas.filter(s =>{

      if( buscarPorCodigo )
      {
        if(s.UsuarioSolicitanteId.toString().indexOf(this.txtTerminoBusqueda) > -1)
          return true
      }
      else
      {
        if(s.UsuarioSolicitante.toLowerCase().indexOf(this.txtTerminoBusqueda) > -1  )
          return true
      }
    })

  }


  toggleEstadoSolicitudes()
  {
    if(this.chkSoloAprobadas)
    {
      this.solicitudes = this.solicitudesCargadas.filter(s =>
         s.EstadoId ==  EstadoSolicitud.Aprobada  || s.EstadoId ==  EstadoSolicitud.Salida || 
         s.EstadoId ==  EstadoSolicitud.Finalizada 
        );
    }
    else
    {
      this.solicitudes = this.solicitudesCargadas;
    }
  }


  isNumeric(n) 
  {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }


}
