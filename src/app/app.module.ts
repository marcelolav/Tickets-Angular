import { BrowserModule } from '@angular/platform-browser';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgModule } from '@angular/core';
// Componentes principales y de routing
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Componentes creados
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { HomeComponent } from './componentes/home/home.component';
import { Page404Component } from './componentes/page404/page404.component';
import { VerticketsComponent } from './componentes/vertickets/vertickets.component';
import { AbmsitiosComponent } from './componentes/abmsitios/abmsitios.component';
import { AbmequiposComponent } from './componentes/abmequipos/abmequipos.component';
import { AbmusuariosComponent } from './componentes/abmusuarios/abmusuarios.component';
import { ReporteEquiposComponent } from './componentes/reporte-equipos/reporte-equipos.component';
import { ReporteSitiosComponent } from './componentes/reporte-sitios/reporte-sitios.component';
// Variables globales y de entorno * deberia haber 1 solo archivo environments...
import { environment } from '../environments/environment';
// Firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuditoriaService } from './servicios/auditoria.service';
import { TicketnewComponent, ModalContentComponent } from './componentes/ticketnew/ticketnew.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AbmhallsComponent } from './componentes/abmhalls/abmhalls.component';
import { PlanilladiariaComponent } from './componentes/planilladiaria/planilladiaria.component';
import { ReporteHallsComponent } from './componentes/reporte-halls/reporte-halls.component';
import { ExportAsModule } from 'ngx-export-as';
import { AbmestadosComponent } from './componentes/abmestados/abmestados.component';
import { TicketResolucionComponent } from './componentes/ticket-resolucion/ticket-resolucion.component';
import { TicketCambioestadoComponent } from './componentes/ticket-cambioestado/ticket-cambioestado.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    Page404Component,
    VerticketsComponent,
    AbmsitiosComponent,
    AbmequiposComponent,
    AbmusuariosComponent,
    ReporteEquiposComponent,
    ReporteSitiosComponent,
    ModalContentComponent,
    TicketnewComponent,
    AbmhallsComponent,
    PlanilladiariaComponent,
    ReporteHallsComponent,
    AbmestadosComponent,
    TicketResolucionComponent,
    TicketCambioestadoComponent
  ],
  imports: [
    BrowserModule,
    FilterPipeModule,
    OrderModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    ExportAsModule
  ],
  exports: [ModalContentComponent],
  entryComponents: [ModalContentComponent],
  providers: [AngularFireAuth, AngularFirestore, AuditoriaService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
