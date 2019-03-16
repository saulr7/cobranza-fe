import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from '../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleUsuarioEstandarGuard implements CanActivate {

  constructor(
    private loginService: LoginService
    , public router: Router
  ) { }


  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  
      const tokenPayload = this.loginService.TokenPayload();

      if ( this.loginService.IsLogIn() && (tokenPayload.PerfilId == 1 || tokenPayload.PerfilId == 2 || tokenPayload.PerfilId == 4 ) )
        {
          return true;
        }

      if (this.loginService.IsLogIn() && tokenPayload.PerfilId == 3 ) 
        {
          this.router.navigate(['/marcarEntradaSalida']);
          return false;
        } 
      else
        {
          return false;
        }
  }
}
