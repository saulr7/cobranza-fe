import { Component, OnInit } from '@angular/core';
import {MotivosService} from '../../services/motivos/motivos.service';
import {IMotivosSalida} from '../../models/motivosSalida/MotivosSalida';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mantenimiento-motivos',
  templateUrl: './mantenimiento-motivos.component.html',
  styleUrls: ['./mantenimiento-motivos.component.css']
})
export class MantenimientoMotivosComponent implements OnInit {


  motivos = [];
  hayDatosParaMostrar: boolean = true
  editarDescripcion : boolean = false
  nuevoMotivo : boolean = false;
  txtDescripcion : string = "";
  chkRequiereComentario: boolean = false
  cargando : boolean = false;
  chkActivo: boolean = true;
  Titulo : string = "Mantenimiento motivos"

  constructor(
    private motivosService : MotivosService
  ) { }

  ngOnInit() {
    this.obtener_motivos_todos();
  }



  obtener_motivos_todos()
  {
    this.motivosService.obtener_motivos_todos()
    .then((response)=>
    {

      this.motivos = []
      response.forEach(element => {
        var motivo = new IMotivosSalida()
        motivo.Id = element.Id
        motivo.Descripcion = element.Descripcion
        motivo.ObservacionObligatoria = element.ObservacionObligatoria
        motivo.Activo = element.Activo
        this.motivos.push(motivo)
      });

      if(this.motivos.length>0)
        this.hayDatosParaMostrar = true
      else
        this.hayDatosParaMostrar = false

    })
    .catch((err)=>
    {
      console.log(err);
    })
  }


  crear_nuevo_motivo()
  {
    if(!this.txtDescripcion)
    {
      Swal("Debes agregar la descripción para el nuevo motivo" ,"Atención",'warning') 
      return
    }

    var nuevoMotivoSalida = new IMotivosSalida()
    nuevoMotivoSalida.Descripcion = this.txtDescripcion
    nuevoMotivoSalida.Activo = this.chkActivo
    nuevoMotivoSalida.ObservacionObligatoria = this.chkRequiereComentario

    console.log(nuevoMotivoSalida);

    this.motivosService.guardar_motivo_salida(nuevoMotivoSalida)
    .then(()=>
    {

      Swal("Se ha creado el motivo exitosamente" ,"Éxito",'success') 

      this.obtener_motivos_todos();
      this.nuevoMotivo = false
    })
    .catch((err)=>
    {
      Swal("Algo ha salido mal al guardar le motivo de salida, "+err.error.Message ,"Error",'error') 
      console.log(err);
    })
  }


  actualiza_motivo_salida(motivo, activo, requiereComentario)
  {
    if(!motivo.Descripcion)
    {
      Swal("Debes agregar la descripción para el nuevo motivo" ,"Atención",'warning') 
      return
    }

    if(activo)
      motivo.Activo = !motivo.Activo
    if(requiereComentario)
      motivo.ObservacionObligatoria = !motivo.ObservacionObligatoria

    console.log(motivo , activo, requiereComentario);

    this.motivosService.actualizar_motivo_salida(motivo)
    .then(()=>
    {
      Swal("Se ha actualizado el motivo " ,"Éxito",'success') 
      motivo.editar = false
      this.obtener_motivos_todos();
    })
    .catch((err)=>
    {
      Swal("Algo ha salido mal al guardar le motivo de salida, "+err.error.Message ,"Error",'error') 
      console.log(err);
    })
  }

}
