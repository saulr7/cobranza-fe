import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-estado-factura',
  templateUrl: './estado-factura.component.html'
})
export class EstadoFacturaComponent implements OnInit {

  @Input() public FechaPago: string = "";
  @Input() public Pagada: boolean = false;
  @Input() public Anulada: boolean = false;
  @Input() public FechaAnulada: string = "";

  @Input() public facturaPagada: boolean = true;
  constructor() { }

  ngOnInit() {
    this.validate_factura_pagada();
  }


  validate_factura_pagada()
  {

    if(this.FechaPago != null && this.Pagada ==true && this.Anulada == false && this.FechaAnulada == null )
      this.facturaPagada = true
    else
      this.facturaPagada = false

  }


}
