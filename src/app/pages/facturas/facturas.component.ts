import { Component, OnInit } from '@angular/core';
import { IFactura } from 'src/app/models/facturaModel';
import { IFacturaPeriodoModel } from 'src/app/models/facrturaPeridoModel';
import { FacturasService } from 'src/app/services/facturas.service';
import {Meses} from '../../models/Meses';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html'
})
export class FacturasComponent implements OnInit {
  
  Titulo : string = "Facturas"

  facturaModel = new IFactura()
  periodosFacturados = new IFacturaPeriodoModel();
  hayDatosParaMostrar : boolean = true;
  cargando : boolean = true;
  cmbAnio: number =  new Date().getFullYear()
  cmbMes: number = (new Date().getMonth() +2)
  Anios :number[] = []
  fechaFacturas = {year : 1, month : 1,  day: 1};
  generarFactura : boolean = false;

  Meses  = Meses;

  constructor(
    private facturaService : FacturasService
  ) { }

  ngOnInit() 
  {
    this.setear_fecha();
    this.obtener_periodos_facturados();
  }

  setear_fecha()
  {
    this.fechaFacturas = {year : new Date().getFullYear(), month : new Date().getMonth()+1,  day: new Date().getDate()+1};

    var fecha = new Date()
    var Anio = fecha.getFullYear();

    
    for (let i = 3 ; i > 1; i--) {
      this.Anios.push(Anio+i)
    }

    this.Anios.push(Anio)
    
    for (let i = 1; i < 3; i++) {
      this.Anios.push(Anio- i)
      

     

    }

  
  }

  generar_facturas()
  {
    var periodo = this.fechaFacturas.year + "-" + this.fechaFacturas.month + "-" +this.fechaFacturas.day
    this.facturaModel.Anio = this.cmbAnio
    this.facturaModel.Mes = this.cmbMes

    this.facturaModel.FechaVence = periodo
  

    this.facturaService.generar_facturas(this.facturaModel)
    .then((result) => 
    {
      Swal("Petición ejecutada exitosamente","Éxito",'success') 
      this.obtener_periodos_facturados();
    })
    .catch((err) => {
      console.log(err);
        Swal("Algo ha salido mal, " + err.error.message,"Error",'error') 
    });
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
