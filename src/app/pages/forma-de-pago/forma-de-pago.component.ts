import { Component, OnInit } from '@angular/core';
import { FormaDePagoService } from 'src/app/services/forma-de-pago.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { IFormaPago } from 'src/app/models/formaDePago';

@Component({
  selector: 'app-forma-de-pago',
  templateUrl: './forma-de-pago.component.html',
  styles: []
})
export class FormaDePagoComponent implements OnInit {

  Titulo:string = "Formas de pago";
  formasDePago :IFormaPago[] = []
  nuevaFormaPago = new  IFormaPago();
  cargando : boolean = false;
  hayDatosParaMostrar : boolean = false;
  crearFormaPago : boolean = false
  
  constructor(
    private formaDePagoSevice : FormaDePagoService
  ) { }

  ngOnInit() {
    this.mostrar_formas_pago()
    this.nuevaFormaPago.Activo = true
  }

  mostrar_formas_pago()
  {
    this.cargando = true
    this.formaDePagoSevice.mostrar_todas()
    .then((formasDePago)=>
    {
      console.log(formasDePago);
      formasDePago.forEach(formaDePago => {
          this.formasDePago.push(formaDePago)
      });
      this.cargando = false;
      if(this.formasDePago.length >0)
        this.hayDatosParaMostrar = true
      else
        this.hayDatosParaMostrar = false
    })
    .catch((err)=>
    {
      Swal("No se han podido guardar los datos, " + err.error.message.name,"Error",'error') 
    })
  }


  toogle_forma_pago(formaDePago: IFormaPago)
  {
    
    formaDePago.Activo = (formaDePago.Activo) ? false : true
    this.formaDePagoSevice.cambiar_estado(formaDePago)
    .then((resp)=>
    {
      Swal("Datos actualizados exitosamente" ,"Éxito" ,'success') 
    })
    .catch((err)=>
    {
      console.log(err);
      Swal("Algo ha salido mal, " + err.error.message.name,"Error",'error') 
    })
  }

  crear_nueva_formaDePago()
  {
    if(!this.nuevaFormaPago.Descripcion)
    {
      Swal("La descripción es necesaria" ,"Atención" ,'warning') 
      return
    }
    console.log(this.nuevaFormaPago);
    this.formaDePagoSevice.nueva_formaDePago(this.nuevaFormaPago)

    .then((resp)=>{
      Swal("Datos actualizados exitosamente" ,"Éxito" ,'success') 
      this.crearFormaPago = false;
      this.mostrar_formas_pago();
    })
    .catch((err)=>
    {
      console.log(err);
      Swal("Algo ha salido mal, " + err.error.message.name,"Error",'error') 
    })

  }

}
