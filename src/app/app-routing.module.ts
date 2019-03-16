import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

//Pages
import { CrearSolicitudComponent } from './pages/crear-solicitud/crear-solicitud.component';
import { SolicitudesComponent } from './pages/solicitudes/solicitudes.component';
import { FormatoPaseSalidaComponent } from './common/formato-pase-salida/formato-pase-salida.component';
import { LoginComponent} from '../app/pages/login/login.component';
import { SolicitudesRecibidasComponent} from '../app/pages/solicitudes-recibidas/solicitudes-recibidas.component';
import { MarcarEntradaSalidaComponent} from '../app/pages/marcar-entrada-salida/marcar-entrada-salida.component';
import { MisSolicitudesComponent} from '../app/pages/mis-solicitudes/mis-solicitudes.component';
import { VerSolicitudComponent} from '../app/pages/ver-solicitud/ver-solicitud.component';
import { MantenimientoEmpleadosComponent} from '../app/pages/mantenimiento-empleados/mantenimiento-empleados.component';
import { MantenimientoMotivosComponent} from '../app/pages/mantenimiento-motivos/mantenimiento-motivos.component';
import { AuthService} from './guards/auth.service';
import { ReporteEntradasSalidasComponent} from '../app/pages/reporte-entradas-salidas/reporte-entradas-salidas.component';
import { MantenimientoEmpleadosAreaComponent} from '../app/pages/mantenimiento-empleados-area/mantenimiento-empleados-area.component';
import {NotFoundComponent} from '../app/pages/not-found/not-found.component';
import {CrearPaseRecurrenteComponent} from '../app/pages/crear-pase-recurrente/crear-pase-recurrente.component';
//Guards
import {RoleGuardService} from './guards/role-guard.service';
import {RoleMarcajeService} from './guards/role-marcaje.service';
import {RoleUsuarioEstandarGuard} from '../app/guards/role-usuario-estandar.guard';

const routes: Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'crearSolicitud' , component : CrearSolicitudComponent , canActivate  : [RoleUsuarioEstandarGuard]  },
  {path : 'crearPaseRecurrente' , component : CrearPaseRecurrenteComponent , canActivate  : [AuthService]},
  {path : 'solicitudes', component : SolicitudesComponent , canActivate  : [AuthService] },
  {path : 'solicitudesRecibidas' , component : SolicitudesRecibidasComponent , canActivate  : [AuthService]},
  {path : 'formato/:solicitudId', component : FormatoPaseSalidaComponent , canActivate  : [AuthService]},
  {path : 'marcarEntradaSalida', component : MarcarEntradaSalidaComponent , canActivate  : [RoleMarcajeService], data: { expectedRole2: '3'} },
  {path : 'misSolicitudes', component : MisSolicitudesComponent , canActivate  :  [RoleUsuarioEstandarGuard]   },
  {path : 'verSolicitud/:solicitudId', component : VerSolicitudComponent , canActivate  : [AuthService]},
  {path : 'verSolicitud/:solicitudId/:recurrente', component : VerSolicitudComponent , canActivate  : [AuthService]},
  {path : 'mantenimientoEmpleados' , component : MantenimientoEmpleadosComponent , canActivate  : [AuthService] , data: { expectedRole1: '1'  } },
  {path : 'mantenimientoPorArea' , component : MantenimientoEmpleadosAreaComponent, canActivate  : [AuthService] , data: { expectedRole1: '4'  } },
  {path : 'mantenimientoMotivos' , component : MantenimientoMotivosComponent , canActivate  : [RoleGuardService] , data: { expectedRole1: '1'  }  },
  {path : 'reporteEntradasSalidas' , component : ReporteEntradasSalidasComponent ,   canActivate  : [AuthService] }, 
  {path : '**', component :  NotFoundComponent ,  canActivate  : [AuthService] }

];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
