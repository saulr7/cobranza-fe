import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';

import Swal from 'sweetalert2'
import { IServicio } from 'src/app/models/servicioModel';
import { ActivatedRoute } from '@angular/router';
import { ViviendaService } from 'src/app/services/vivienda.service';
import { IVivienda } from 'src/app/models/viviendaModel';

@Component({
  selector: 'app-ver-vivienda',
  templateUrl: './ver-vivienda.component.html'
})
export class VerViviendaComponent implements OnInit {

  Titulo: string  = "Vivienda"
  cargando :boolean = true;
  hayDatosParaMostrar : boolean = true;
  chkTodosClientes : boolean = true;
  Servicos : IServicio[] = [];
  ServicosVivienda : IServicio[] = [];
  nuevoServicio = new IServicio()
  Vivienda : IVivienda;
  agregarNuevoServicio : boolean = false;
  
  viviendaId :any;

  constructor(
    private servicioService : ServiciosService,
    private viviendaService : ViviendaService,
    private route : ActivatedRoute,
  ) {
    this.viviendaId =  this.route.snapshot.paramMap.get("viviendaId")
   }

  ngOnInit() {
    this.obtener_servicios_vivienda();
    this.obtener_servicios();
  }


  obtener_servicios_vivienda()
  {

    this.cargando = true
    this.viviendaService.viviendaById(this.viviendaId)
    .then((vivienda) => 
    {

        this.Vivienda = vivienda
        this.ServicosVivienda = vivienda.servicios_viviendas
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




  eliminar_servicio_vivienda(id)
  {


    Swal({
      title: '¿Eliminar este servicio ?',
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
        this.viviendaService.eliminar_servicio_vivienda(id)
        .then((result) => {
          Swal("Datos actualizados exitosamente" ,"Éxito",'success')
          this.obtener_servicios_vivienda();
          
        }).catch((err) => {
          console.log(err);
          Swal("Algo ha salido mal, " + err.error.message,"Error",'error') 
        });
      }
    })


  }


  crear_vivienda_servicio()
  {
    var viviendaServicio = {servicioId : this.nuevoServicio.id, viviendaId: this.viviendaId}

    this.viviendaService.nuevo_servicio_vivienda(viviendaServicio)
    .then((result) => {
      Swal("Datos actualizados exitosamente" ,"Éxito",'success')
      this.obtener_servicios_vivienda();
      this.agregarNuevoServicio = false
      
    }).catch((err) => {
      console.log(err);
      Swal("Algo ha salido mal, " + err.error,"Error",'error') 
    });
  }



}
