import { Component, OnInit } from '@angular/core';
import { FacturasService } from 'src/app/services/facturas.service';
import { IFactura } from 'src/app/models/facturaModel';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-facturas-periodo',
  templateUrl: './facturas-periodo.component.html'
})
export class FacturasPeriodoComponent implements OnInit {

  Titulo: string = "Facturas por periodo"
  hayDatosParaMostrar : boolean = true;
  facturas : IFactura[] = []
  cargando : boolean = true;    
  facturaPagada : boolean = true;    
  txtCliente:string = "";
  Anio : any;
  Mes : any;

  constructor(
    private facturaService : FacturasService,
    private route : ActivatedRoute
  ) {
    this.Anio =  this.route.snapshot.paramMap.get("anio")
    this.Mes =  this.route.snapshot.paramMap.get("mes")
   }

  ngOnInit() {
    this.obtener_facturas();
  }





  obtener_facturas()
  {
    this.cargando = true
    this.facturaService.facturas_Byperiodo(this.Anio,this.Mes)
    .then((facturas) => {
      this.facturas = facturas
      this.cargando = false
      if(this.facturas.length > 0)
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
