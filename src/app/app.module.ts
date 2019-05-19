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
import { PersonasComponent } from './pages/personas/personas.component';
import { NuevaPersonaComponent } from './pages/nueva-persona/nueva-persona.component';
import { FormaDePagoComponent } from './pages/forma-de-pago/forma-de-pago.component';
import { FacturasPendientesComponent } from './pages/facturas-pendientes/facturas-pendientes.component';
// import { PagarFacturaComponent } from './pages/pagar-factura/pagar-factura.component';
import { MisFacturasComponent } from './pages/mis-facturas/mis-facturas.component';
import { VerFacturaComponent } from './pages/ver-factura/ver-factura.component';
import { VisitasComponent } from './pages/visitas/visitas.component';
import { MisVisitasComponent } from './pages/mis-visitas/mis-visitas.component';
import { NuevoAnuncioComponent } from './pages/nuevo-anuncio/nuevo-anuncio.component';
import { AnunciosComponent } from './pages/anuncios/anuncios.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {NombreMesPipe} from '../app/pipes/NombreMes/nombre-mes.pipe';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { FacturasPeriodoComponent } from './pages/facturas-periodo/facturas-periodo.component';
import { EstadoFacturaComponent } from './common/estado-factura/estado-factura.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { VerViviendaComponent } from './pages/ver-vivienda/ver-vivienda.component';
import { PersonaComponent } from './pages/persona/persona.component';
import { EnviarCorreoComponent } from './pages/enviar-correo/enviar-correo.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { FacturadasHoyComponent } from './pages/facturadas-hoy/facturadas-hoy.component';
import { FacturasPagadasComponent } from './pages/facturas-pagadas/facturas-pagadas.component';
import { FacturasSinPagarComponent } from './pages/facturas-sin-pagar/facturas-sin-pagar.component';
import { FacturasTodasComponent } from './pages/facturas-todas/facturas-todas.component';



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
    CrearPaseRecurrenteComponent,
    PersonasComponent,
    NuevaPersonaComponent,
    FormaDePagoComponent,
    FacturasPendientesComponent,
    // PagarFacturaComponent,
    MisFacturasComponent,
    VerFacturaComponent,
    VisitasComponent,
    MisVisitasComponent,
    NuevoAnuncioComponent,
    AnunciosComponent,
    NombreMesPipe,
    FacturasComponent,
    FacturasPeriodoComponent,
    EstadoFacturaComponent,
    ServiciosComponent,
    VerViviendaComponent,
    PersonaComponent,
    EnviarCorreoComponent,
    ReportesComponent,
    FacturadasHoyComponent, 
    FacturasPagadasComponent,
    FacturasSinPagarComponent,
    FacturasTodasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AngularFontAwesomeModule,
    AngularEditorModule
  ],
  providers: [
    NavbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
