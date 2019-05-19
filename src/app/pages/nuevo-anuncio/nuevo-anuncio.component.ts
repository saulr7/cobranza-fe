import { Component, OnInit } from '@angular/core';
import { IAnuncio } from 'src/app/models/anuncioModel';
import Swal from 'sweetalert2'
import { AnuncioService } from 'src/app/services/anuncio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-anuncio',
  templateUrl: './nuevo-anuncio.component.html'
})
export class NuevoAnuncioComponent implements OnInit {

  Titulo : string = "Nuevo anuncio"
  htmlContent: string = "";
  cargando:boolean = false;

  nuevoAnuncio = new IAnuncio();


  constructor(
    private anuncioServicio : AnuncioService,
    private router : Router
  ) { }

  ngOnInit() {
  }


  guardar_anuncio()
  {
    this.nuevoAnuncio.FechaDesde = ""
    this.nuevoAnuncio.FechaHasta = ""
    this.nuevoAnuncio.Publicado = true
    this.nuevoAnuncio.Activo = true

    if(!this.nuevoAnuncio.Titulo)
        {
          Swal("Es necesario el título de la publicación" ,"Atención",'warning')
          return
        }
        
    if(!this.nuevoAnuncio.Contenido)
      {
        Swal("Es necesario el contenido de la publicación" ,"Atención",'warning')
        return
      }

    console.log(this.nuevoAnuncio);

    this.anuncioServicio.nuevo_anuncio(this.nuevoAnuncio)
    .then((result) => {
      Swal("Datos guardados exitosamente" ,"Éxito",'success')
      this.router.navigate(["/anuncios"]);
    }).catch((err) => {
      console.log(err);
      Swal("Algo ha salido mal" ,"Error",'error')
    });

  }







}
