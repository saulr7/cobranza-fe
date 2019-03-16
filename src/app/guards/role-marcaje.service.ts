import { Injectable } from '@angular/core';
import { Router, CanActivate,  ActivatedRouteSnapshot} from '@angular/router';
import {LoginService} from '../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleMarcajeService {

  constructor(
    private loginService: LoginService
    , public router: Router
  ) { }


  
  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole1 = route.data.expectedRole1;
    const expectedRole2 = route.data.expectedRole2;

    const tokenPayload = this.loginService.TokenPayload();
    if ( !this.loginService.IsLogIn() || (tokenPayload.PerfilId != expectedRole1 && tokenPayload.PerfilId != expectedRole2) )
      {
        this.router.navigate(['/misSolicitudes']);
        return false;
      }
    return true;
  }

}
