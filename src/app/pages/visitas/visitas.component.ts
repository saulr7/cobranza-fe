import { Component, OnInit } from '@angular/core';
import { VisitasService } from 'src/app/services/visitas.service';
import { IVisita } from 'src/app/models/visitaModel';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrls: ['./visitas.component.css']
})
export class VisitasComponent implements OnInit {

  Titulo : string = "Visitas"
  visitas: IVisita[] = []
  visitasLoaded: IVisita[] = []
  hayDatosParaMostrar: boolean = true;
  cargando: boolean = true;
  txtNombre: string = "";

  constructor(
    private visitaService : VisitasService
  ) { }

  ngOnInit() {
    this.obtener_visitas();
  }


  obtener_visitas()
  {
    this.cargando = true
    this.visitaService.visitas()
    .then((visitas) => {
      console.log(visitas);
        this.visitas = visitas
        this.visitasLoaded = visitas
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



  filtrar_datos(event: any) 
  { 
    this.txtNombre = this.txtNombre.toLowerCase();

    this.visitas = this.visitasLoaded.filter(s =>{

      if(s.NombreVisitante.toLowerCase().indexOf(this.txtNombre) > -1 
          ||  s.usuario.persona.Nombre.toLowerCase().indexOf(this.txtNombre) > -1 
          ||  s.usuario.persona.Apellido.toLowerCase().indexOf(this.txtNombre) > -1 
          )
      {
          return true
      }
    })
  }




}
