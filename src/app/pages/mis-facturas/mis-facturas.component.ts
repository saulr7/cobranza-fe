import { Component, OnInit } from '@angular/core';
import { IFactura } from 'src/app/models/facturaModel';
import { FacturasService } from 'src/app/services/facturas.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mis-facturas',
  templateUrl: './mis-facturas.component.html'
})
export class MisFacturasComponent implements OnInit {

  Titulo: string = "Mis facturas"

  facturasPendientes : IFactura[] = [];
  hayDatosParaMostrar: boolean = true
  viviendaId : any;
  cargando : boolean = false;

  constructor(
    private facturaService : FacturasService
  ) { }

  ngOnInit() {
    this.obtener_facturas()
  }


  obtener_facturas()
  {
    this.cargando = true;
    this.facturaService.mis_facturas(   )
    .then((facturas) => {
      
      this.facturasPendientes = facturas


      if(this.facturasPendientes.length > 0 )
        this.hayDatosParaMostrar = true
      else
      this.hayDatosParaMostrar = false

      this.cargando = false;

    }).catch((err) => {
        Swal("Algo ha salido mal, " + err.error.message,"Error",'error') 
        this.cargando = false;
        console.log(err);
    });
  }


}
