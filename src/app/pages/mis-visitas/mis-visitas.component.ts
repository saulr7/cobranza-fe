import { Component, OnInit } from '@angular/core';
import { IVisita } from 'src/app/models/visitaModel';
import { VisitasService } from 'src/app/services/visitas.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mis-visitas',
  templateUrl: './mis-visitas.component.html',
  styleUrls: ['./mis-visitas.component.css']
})
export class MisVisitasComponent implements OnInit {


  Titulo : string = "Visitas"
  visitas: IVisita[] = [];
  nuevaVisita = new IVisita();
  hayDatosParaMostrar: boolean = true;
  cargando: boolean = true;
  txtNombre: string = "";
  fechaVisita = {year : 1, month : 1,  day: 1};
  registrarVisita: boolean = false;

  constructor(
    private visitaService : VisitasService
  ) { }

  ngOnInit() {
    this.obtener_visitas();
    this.setear_fecha()
  }

  setear_fecha()
  {
    this.fechaVisita = {year : new Date().getFullYear(), month : new Date().getMonth()+1,  day: new Date().getDate()+1};
  
  }

  obtener_visitas()
  {
    this.cargando = true
    this.visitaService.mis_visitas()
    .then((visitas) => {
        this.visitas = visitas
        this.cargando = false

        if(this.visitas.length > 0)
          this.hayDatosParaMostrar = true
        else
        this.hayDatosParaMostrar = false
      
    }).catch((err) => {
      Swal("Algo ha salido mal, " + err.error.message,"Error",'error') 
      this.cargando = false
      console.log(err);
      
    });
  }



  guardar_nueva_visita()
  {
    if(!this.nuevaVisita.NombreVisitante)
      Swal("Debe ingresar el nombre del visitante ", "Error",'warning') 

    var fecha = this.fechaVisita.year + "-" + this.fechaVisita.month + "-" +this.fechaVisita.day
    this.nuevaVisita.Fecha_visita = fecha

    this.visitaService.nueva_visita(this.nuevaVisita)
    .then((result) => {
      Swal("Datos guardados exitosamente ", "Error",'success') 
      this.nuevaVisita = new IVisita()
      this.registrarVisita = false;
      this.obtener_visitas();
    }).catch((err) => {
      console.log(err);
        Swal("Algo ha salido mal, " + err.error.message,"Error",'error') 
    });
  }


  eliminar_visita(visitaId)
  {
    this.visitaService.eliminar_visita(visitaId)
    .then((result) => {
      Swal("Datos guardados exitosamente ", "Error",'success') 
      this.obtener_visitas();
    }).catch((err) => {
      console.log(err);
        Swal("Algo ha salido mal, " + err.error.message,"Error",'error') 
    });
  }





}
