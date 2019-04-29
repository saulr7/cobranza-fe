import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';

import Swal from 'sweetalert2'
import { IServicio } from 'src/app/models/servicioModel';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html'
})
export class ServiciosComponent implements OnInit {

  Titulo: string  = "Servicios"
  cargando :boolean = true;
  hayDatosParaMostrar : boolean = true;
  chkTodosClientes : boolean = true;
  crearFormaPago : boolean = false;
  Servicos: IServicio[] = [];
  nuevoServicio = new IServicio()

  constructor(
    private servicioService : ServiciosService
  ) { }

  ngOnInit() {
    this.obtener_servicios()
  }


  obtener_servicios()
  {
    this.cargando = true;
    this.servicioService.servicios()
    .then((servcios) => 
    {
        this.Servicos = servcios
        this.cargando = false
        if(this.Servicos.length > 0)
          this.hayDatosParaMostrar = true
        else
          this.hayDatosParaMostrar = false
    })
    .catch((err) => 
    {
        this.cargando = false
        console.log(err);
        Swal("Algo ha salido mal, " + err.error.message,"Error",'error') 
    });
  }


  crear_nuevo_servicio()
  {

    if(!this.nuevoServicio.Descripcion)
    {
      Swal("La descripción del servicio es necesaria","Atención",'warning') 
      return
    }

    if(!this.nuevoServicio.Valor)
    {
      Swal("El valor del servicio es necesario","Atención",'warning') 
      return
    }
  
    this.nuevoServicio.TodosLosClientes = this.chkTodosClientes

    this.servicioService.nuevo_servicio(this.nuevoServicio)
    .then((result) => 
    {
      Swal("Petición ejecutada exitosamente","Éxito",'success') 
      this.obtener_servicios();
      
    }).catch((err) => 
    {
      console.log(err);
      Swal("Algo ha salido mal, " + err.error.message,"Error",'error') 
      
    });


  }




  eliminar_servicio(servicioId)
  {

    Swal({
      title: '¿Eliminar Servicio ?',
      text: 'Esta acción no se puede revertir',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33c',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'No',
      
    }).then((result) => 
    {
      if (result.value) 
      {
        this.servicioService.eliminar_servicio(servicioId)
        .then((result) => {
          Swal("Datos actualizados exitosamente" ,"Éxito",'success')
          this.obtener_servicios();
          
        }).catch((err) => {
          console.log(err);
          Swal("Algo ha salido mal, " + err.error.message,"Error",'error') 
        });
      }
    })



  }



}
