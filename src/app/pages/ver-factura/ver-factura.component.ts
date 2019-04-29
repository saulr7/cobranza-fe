import { Component, OnInit } from '@angular/core';
import { IFactura } from 'src/app/models/facturaModel';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { FacturasService } from 'src/app/services/facturas.service';
import { LoginService } from 'src/app/services/login.service';
import { IFacturaCompleta } from 'src/app/models/facturaCompletaModel';

@Component({
  selector: 'app-ver-factura',
  templateUrl: './ver-factura.component.html'
})
export class VerFacturaComponent implements OnInit {

  Titulo : string = "Factura"
  factura : IFacturaCompleta = new IFacturaCompleta() ;
  facturaId: any;
  mostrarBtnPagar:boolean = false;
  facturaPagada:boolean = false;
  isAdmin:boolean = false;
  cargando:boolean = false;


  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private facturaService : FacturasService,
    private loginService : LoginService
  ) {
    this.facturaId =  this.route.snapshot.paramMap.get("facturaId")
    this.isAdmin = loginService.IsAdmin();
   }

  ngOnInit() {
    this.obtener_datos_factura()
    this.mostrar_btn_pagar();
  }


  obtener_datos_factura()
  {
    this.facturaService.facturaById(this.facturaId)
    .then((factura) => {
      this.factura = factura
      console.log(this.factura);
      this.validar_factura_esta_pagada();
      this.mostrar_btn_pagar();
    }).catch((err) => {
      Swal("Algo ha salido mal, " + err.error.message,"Error",'error') 
      console.log(err);
    });
  }


  pagar_factura()
  {
    this.facturaService.pagar_factura(this.factura)
    .then((res) => {
      Swal("Factura pagada exitosamente","Error",'success') 
      this.imprimir_factura();
      // window.history.back();
      // this.router.navigate( ['//:solicitudId/' ]);
    }).catch((err) => {
      Swal("Algo ha salido mal, " + err.error.message,"Error",'error') 
    });
  }


  mostrar_btn_pagar()
  {

    if(this.isAdmin && this.facturaPagada == false)
      this.mostrarBtnPagar = true
    else
      this.mostrarBtnPagar = false
  }





  validar_factura_esta_pagada()
  {
    this.facturaPagada = this.facturaService.es_factura_pagada(this.factura.FechaPago,this.factura.Pagada, this.factura.Anulada, this.factura.FechaAnulada)
    console.log("Esta pagada ", this.facturaPagada);

  }


  imprimir_factura()
  {
    window.print();
  }



}

