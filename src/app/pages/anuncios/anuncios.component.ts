import { Component, OnInit } from '@angular/core';
import { IAnuncio } from 'src/app/models/anuncioModel';
import { AnuncioService } from 'src/app/services/anuncio.service';
import Swal from 'sweetalert2'
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html'
})
export class AnunciosComponent implements OnInit {

  Titulo:string = "Anuncios"
  cargando : boolean = true;
  hayDatosParaMostrar: boolean = true
  anuncios: IAnuncio[] = []
  isAdmin:boolean = false;


  constructor(
    private anuncioServicio : AnuncioService,
    private loginService : LoginService
  ) {  
    this.isAdmin = loginService.IsAdmin()
   }

  ngOnInit() {
    this.obtener_anuncios()
  }


  obtener_anuncios()
  {
    this.cargando = true
    this.anuncioServicio.anuncios()
    .then((anuncios) => {
      
      this.anuncios = anuncios 

      this.cargando = false

      if(this.anuncios.length > 0)
          this.hayDatosParaMostrar = true
      else
        this.hayDatosParaMostrar = false

    }).catch((err) => {
      Swal("Algo ha salido mal, " + err.error.message,"Error",'error') 
      this.cargando = false
      console.log(err);
    });
  }




  eliminar_anuncio(anuncioId)
  {


    Swal({
      title: '¿Eliminar publicación  ?',
      text: 'Esta acción no se puede revertir',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33ç',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'No',
      
    }).then((result) => 
    {
      if (result.value) 
      {
        this.anuncioServicio.eliminar_anuncio(anuncioId)
        .then((result) => {
          Swal("Datos actualizados exitosamente" ,"Éxito",'success')
          this.obtener_anuncios();
          
        }).catch((err) => {
          console.log(err);
          Swal("Algo ha salido mal, " + err.error.message,"Error",'error') 
        });
      }
    })

    
   

  }


}
