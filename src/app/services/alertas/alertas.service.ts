import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor() { }



  cerrar_alerta(nombreAlerta: string)
  {
    if(!nombreAlerta)
      return
    localStorage.setItem(nombreAlerta, "true")
  }

  validar_mostrar_alerta(nombreAlerta: string) : boolean
  {
    if(!nombreAlerta)
      return

    var yaSeMostroAlerta = localStorage.getItem(nombreAlerta)
    
    if(yaSeMostroAlerta)
      return true
    else
      return false

  }

}
