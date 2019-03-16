import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SolicitudesService} from '../../services/solicitudes/solicitudes.service';
import {EstadoSolicitud} from '../../models/solicitudes/estados';
import {ISolicitud} from '../../models/solicitudes/solicitud';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formato-pase-salida',
  templateUrl: './formato-pase-salida.component.html',
  styleUrls: ['./formato-pase-salida.component.css']
})
export class FormatoPaseSalidaComponent implements OnInit {

  mostrarBtnImprimir : boolean = true;
  cargando:boolean = true;
  mostrarQuienAutoriza : boolean = false
  solicitudId :any;
  solicitud :ISolicitud;

  constructor(
      private route : ActivatedRoute
    , private solicitudesService : SolicitudesService 
  ) { }

  ngOnInit() {
    this.solicitudId =  this.route.snapshot.paramMap.get("solicitudId")
    this.obterner_info_solicitud();
    this.cargando = false;
  }

  imprimir()
  {
    window.print();
  }


  obterner_info_solicitud()
  {

    this.solicitudesService.ver_solicitud(this.solicitudId)
    .then((resp)=>
    {
      resp.Observaciones =  (resp.Observaciones == undefined ? "" : resp.Observaciones )
      console.log(resp.Observaciones);
      this.solicitud = resp;
      this.validar_mostrar_seccion_aprobado();

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
      this.mostrarQuienAutoriza  = true

    if(this.solicitud.EstadoId == EstadoSolicitud.Salida)    
      this.mostrarQuienAutoriza  = true
    
      if(this.solicitud.EstadoId == EstadoSolicitud.Finalizada)    
      this.mostrarQuienAutoriza  = true
  }

}
