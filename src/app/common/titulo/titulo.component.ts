import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent implements OnInit {

  @Input() public titulo: "Título";
  titulo2 = "titulo2"

  constructor() { }

  ngOnInit() {
  }

  goBack() {
    window.history.back();
  }

}
