import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { CrearSolicitudComponent } from './pages/crear-solicitud/crear-solicitud.component';
import { LoadingComponent } from './common/loading/loading.component';
import { TituloComponent } from './common/titulo/titulo.component';
import { SolicitudesComponent } from './pages/solicitudes/solicitudes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormatoPaseSalidaComponent } from './common/formato-pase-salida/formato-pase-salida.component';
import { LoginComponent } from './pages/login/login.component';
import { SolicitudesRecibidasComponent } from './pages/solicitudes-recibidas/solicitudes-recibidas.component';
import { MarcarEntradaSalidaComponent } from './pages/marcar-entrada-salida/marcar-entrada-salida.component';
import { MisSolicitudesComponent } from './pages/mis-solicitudes/mis-solicitudes.component';
import { VerSolicitudComponent } from './pages/ver-solicitud/ver-solicitud.component';
import { EstadoSolicitudComponent } from './common/estado-solicitud/estado-solicitud.component';
import { NoHayDatosComponent } from './common/no-hay-datos/no-hay-datos.component';
import { MantenimientoMotivosComponent } from './pages/mantenimiento-motivos/mantenimiento-motivos.component';
import { ReporteEntradasSalidasComponent } from './pages/reporte-entradas-salidas/reporte-entradas-salidas.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MantenimientoEmpleadosComponent } from './pages/mantenimiento-empleados/mantenimiento-empleados.component';
import { MantenimientoEmpleadosAreaComponent } from './pages/mantenimiento-empleados-area/mantenimiento-empleados-area.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CrearPaseRecurrenteComponent } from './pages/crear-pase-recurrente/crear-pase-recurrente.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CrearSolicitudComponent,
    LoadingComponent,
    TituloComponent,
    SolicitudesComponent,
    FormatoPaseSalidaComponent,
    LoginComponent,
    SolicitudesRecibidasComponent,
    MarcarEntradaSalidaComponent,
    MisSolicitudesComponent,
    VerSolicitudComponent,
    EstadoSolicitudComponent,
    NoHayDatosComponent,
    MantenimientoMotivosComponent,
    ReporteEntradasSalidasComponent,
    MantenimientoEmpleadosComponent,
    MantenimientoEmpleadosAreaComponent,
    NotFoundComponent,
    CrearPaseRecurrenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AngularFontAwesomeModule
  ],
  providers: [
    NavbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
