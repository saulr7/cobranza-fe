import { Component, OnInit } from '@angular/core';
import { IFactura } from 'src/app/models/facturaModel';
import { FacturasService } from 'src/app/services/facturas.service';
import { ObjectToCsvService } from 'src/app/services/object-to-csv.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-facturas-todas',
  templateUrl: './facturas-todas.component.html'
})
export class FacturasTodasComponent implements OnInit {

  Titulo: string = "Todas las facturas"

  fechaDesde = {year : 1, month : 1,  day: 1};
  fechaHasta = {year : 1, month : 1,  day: 1};
  hayDatosParaMostrar : boolean = false;
  facturas : IFactura[] = []
  cargando : boolean = false;    
  facturaPagada : boolean = true;    

  constructor(
    private facturaService : FacturasService,
    private objectToCsvService : ObjectToCsvService
  ) { }

  ngOnInit() {
    this.setear_fecha()
  }


  setear_fecha()
  {
    this.fechaDesde = {year : new Date().getFullYear(), month : new Date().getMonth()+1,  day: new Date().getDate()};
    this.fechaHasta = {year : new Date().getFullYear(), month : new Date().getMonth()+1,  day: new Date().getDate()};

  }

  obtener_facturas()
  {
    var fechaDesde = this.fechaDesde.year + "-" + this.fechaDesde.month + "-" +this.fechaDesde.day
    var fechaHasta = this.fechaHasta.year + "-" + this.fechaHasta.month + "-" +this.fechaHasta.day

    this.cargando = true;

    this.facturaService.facturas_todas_byFecha(fechaDesde, fechaHasta)
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



  exportToCsv()
  {

    this.objectToCsvService.convert(this.facturas);

  }



}
