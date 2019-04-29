import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { ActivatedRoute } from '@angular/router';
import { FacturasService } from 'src/app/services/facturas.service';
import { IFactura } from 'src/app/models/facturaModel';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-facturas-pendientes',
  templateUrl: './facturas-pendientes.component.html'
})
export class FacturasPendientesComponent implements OnInit {

  Titulo: string = "Facturas pendientes";
  facturasPendientes : IFactura[] = [];
  hayDatosParaMostrar: boolean = true
  viviendaId : any;
  cargando : boolean = false;

  constructor(
    private route : ActivatedRoute,
    private facturaService : FacturasService
  ) { 
    this.viviendaId =  this.route.snapshot.paramMap.get("viviendaId")
  }

  ngOnInit() 
  {
    this.obtener_facturas_pendientes()
  }



  obtener_facturas_pendientes()
  {
    this.cargando = true;
    this.facturaService.facturas_pendientes_vivienda(this.viviendaId)
    .then((facturas) => {
      this.facturasPendientes = facturas

      if(this.facturasPendientes.length > 0 )
        this.hayDatosParaMostrar = true
      else
      this.hayDatosParaMostrar = false

      this.cargando = false;

      console.log(facturas);
    }).catch((err) => {
        Swal("Algo ha salido mal, " + err.error.message,"Error",'error') 
        this.cargando = false;
        console.log(err);
    });
  }


}
