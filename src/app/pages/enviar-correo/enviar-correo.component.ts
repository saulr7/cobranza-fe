import { Component, OnInit } from '@angular/core';
import { IEmailModel } from 'src/app/models/emailModel';
import { EmailService } from 'src/app/services/email.service';
import Swal from 'sweetalert2'
import { FacturasService } from 'src/app/services/facturas.service';
import { IFacturaPeriodoModel } from 'src/app/models/facrturaPeridoModel';

@Component({
  selector: 'app-enviar-correo',
  templateUrl: './enviar-correo.component.html'
})
export class EnviarCorreoComponent implements OnInit {

  Titulo : string = "Nuevo correo"
  htmlContent: string = "";
  cargando:boolean = false;
  nuevoEmail = new IEmailModel();
  btnGuardarEnable:boolean = true;
  chkNotificarPorPeriodo:boolean = false;
  periodosFacturados = new IFacturaPeriodoModel();
  hayDatosParaMostrar : boolean = true;
  

  constructor(
    private emailService : EmailService,
    private facturaService : FacturasService
  ) { }

  ngOnInit() {
    this.obtener_periodos_facturados();
  }


  enviar_email()
  {

    if(this.validar_datos() == false)
      return

    this.cargando =true;
    this.btnGuardarEnable = false;

    this.emailService.nuevo_email(this.nuevoEmail)
    .then((result) => {
      Swal("Correo enviado exitosamente" ,"Éxito",'success');
      this.nuevoEmail.Subject = ""
      this.nuevoEmail.Body = ""
      this.nuevoEmail.NotificarPeriodoFacturado = false
      this.cargando = false;
      this.btnGuardarEnable = true;
  
      
    }).catch((err) => {
      console.log(err);
      Swal("Algo ha salido mal" ,"Error",'error');
      this.cargando = false;
      this.btnGuardarEnable = true;
  
    });

  }


  validar_datos()
  {
    
    if(!this.nuevoEmail.Subject)
      {
        Swal("Es necesario el asunto del correo" ,"Atención",'warning');
        return false
      }

    if(!this.nuevoEmail.Body || this.nuevoEmail.Body == "<br>") 
      {
        Swal("Es necesario el cuerpo del correo" ,"Atención",'warning');
        return false
      }


    if(this.nuevoEmail.NotificarPeriodoFacturado == true)
      {
        if(!this.nuevoEmail.PeriodoSelected)
        {
          Swal("Debe seleccionar el periodo del cual se requiere notificar" ,"Atención",'warning');
          return false
        }
      }

    return true

  }


  obtener_periodos_facturados()
  {
    this.cargando = true
    this.facturaService.periodos_facturados()
    .then((periodos) => {
      this.periodosFacturados = periodos
      this.cargando = false
      if(this.periodosFacturados.count > 0)
        this.hayDatosParaMostrar = true
      else
      this.hayDatosParaMostrar = false

    }).catch((err) => {
      console.log(err);
      this.cargando = false
        Swal("Algo ha salido mal, " + err.error.message,"Error",'error') 
      
    });

  }




}
