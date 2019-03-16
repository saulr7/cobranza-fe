import { Component, OnInit } from '@angular/core';
import {ReporteService} from '../../services/reportes/entradaSalida/reporte.service';
import {EmpleadosService} from '../../services/empleados/empleados.service';
import {ISolicitud} from '../../models/solicitudes/solicitud';
import Swal from 'sweetalert2';
import {EstadosObj} from '../../models/solicitudes/estadosObject';
import {LoginService} from '../../services/login/login.service';

@Component({
  selector: 'app-reporte-entradas-salidas',
  templateUrl: './reporte-entradas-salidas.component.html',
  styleUrls: ['./reporte-entradas-salidas.component.css']
})
export class ReporteEntradasSalidasComponent implements OnInit {

  Titulo:string = "Reporte"
  areaSelected : number = -1
  fechaDesde = {year : 1, month : 1,  day: 1};
  fechaHasta = {year : 1, month : 1,  day: 1};
  areas = []
  cargandoAreas : boolean = true;
  cargandoSolicitudes : boolean = false
  mostarFiltroFechas : boolean = false;
  mostrarBtnsFiltrarGrid : boolean = false
  mostrarClmPuesta : boolean = true;
  hayDatosParaMostrar : boolean = false;
  txtNombre : string = "";
  txtcodigo : string = "";
  estadoSeleccionado: number = -1;
  estados =  EstadosObj
  solicitudesCargadas = []
  solicitudes = [];
  mostrarClmArea : boolean = true;
  mostrarClmMotivo : boolean = true;
  mostrarClmPuesto : boolean = true;
  mostrarClmAutoriza : boolean = true;
  esUsuarioAdminArea : boolean = false

  constructor(
      private reporteService : ReporteService
    , private empleadosService : EmpleadosService
    , private loginService : LoginService
  ) { }

  ngOnInit() 
  {
    this.setear_fecha();
    this.obtener_areas();
    this.validar_usuario_administrador_area()
  }

  setear_fecha()
  {
    this.fechaDesde = {year : new Date().getFullYear(), month : new Date().getMonth()+1,  day: new Date().getDate()};
    this.fechaHasta = {year : new Date().getFullYear(), month : new Date().getMonth()+1,  day: new Date().getDate()};
    
  }


  obtener_areas()
  {
    this.cargandoAreas = true;
    this.empleadosService.obtener_areas()
    .then((response)=>
    {
      response.forEach(element => {
        this.areas.push( { Id : element.Id,  Descripcion : element.Descripcion  }   )
        
      });
      this.cargandoAreas = false

    })
    .catch((err)=>
    {
      console.log(err);
      Swal("Algo ha salido mal al obtener las areas" ,"Error",'error') 
      this.cargandoAreas = false
    })
  }


  obtener_solicitudes()
  {
    if(this.areaSelected < 0)
    {
      Swal("Debes seleccionar un área" ,"Atención",'warning') 
      return
    }

    var fechaDesde = this.fechaDesde.year + "-" + this.fechaDesde.month + "-" +this.fechaDesde.day
    var fechaHasta = this.fechaHasta.year + "-" + this.fechaHasta.month + "-" +this.fechaHasta.day

    this.cargandoSolicitudes = true;
    this.reporteService.ver_solicitud(fechaDesde, fechaHasta, this.areaSelected)
    .then((resp) =>
    {
      this.solicitudes = []
      resp.forEach(element => {
        var solicitud = new ISolicitud()
        solicitud.Id = element.Id
        solicitud.UsuarioSolicitanteId  = element.UsuarioSolicitanteId 
        solicitud.UsuarioSolicitante  = element.UsuarioSolicitante 
        solicitud.EstadoId  = element.EstadoId
        solicitud.FechaCreado = element.FechaCreado 
        solicitud.HoraSalidaMarca  = element.HoraSalidaMarca 
        solicitud.HoraEntradaMarca = element.HoraEntradaMarca 
        solicitud.AreaSolicitante = element.AreaSolicitante 
        solicitud.MotivoSalida = element.MotivoSalida 
        solicitud.Observaciones = element.Observaciones
        solicitud.PuestoSolicitante  = element.PuestoSolicitante 
        solicitud.UsuarioAutoriza = element.UsuarioAutoriza
        
        this.solicitudes.push(solicitud)
        
      });
      this.mostarFiltroFechas = false;
      this.cargandoSolicitudes = false;
      this.solicitudesCargadas = this.solicitudes
      
      if(this.solicitudes.length > 0)
        this.hayDatosParaMostrar = true
      else
        this.hayDatosParaMostrar = false
    })
    .catch((err)=>
    {
      console.log(err);
      Swal("Algo ha salido mal al obtener las solicitudes" ,"Error",'error') 
      this.cargandoSolicitudes = false;
    })
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



   exportTableToExcel(tableID, filename = '')
   {
    this.mostrarBtnsFiltrarGrid = false;
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    tableHTML = tableHTML.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    
    filename = filename ? filename +'.xls': + new Date()+'.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}


validar_usuario_administrador_area()
{
    var payload = this.loginService.TokenPayload()

    if(payload.PerfilId == 4)
    {
      this.areaSelected = payload.AreaId
      this.esUsuarioAdminArea = true
    }

}



}
