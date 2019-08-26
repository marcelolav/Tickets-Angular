import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
// Componentes del sistema (Desde aqui se incluyen todos los diferentes componentes)
import { HomeComponent } from './componentes/home/home.component';
import { Page404Component } from './componentes/page404/page404.component';
import { AuthGuard } from './guards/auth.guard';
import { VerticketsComponent } from './componentes/vertickets/vertickets.component';
import { AbmsitiosComponent } from './componentes/abmsitios/abmsitios.component';
import { AbmequiposComponent } from './componentes/abmequipos/abmequipos.component';
import { AbmhallsComponent } from './componentes/abmhalls/abmhalls.component';
import { AbmusuariosComponent } from './componentes/abmusuarios/abmusuarios.component';
import { ReporteEquiposComponent } from './componentes/reporte-equipos/reporte-equipos.component';
import { ReporteSitiosComponent } from './componentes/reporte-sitios/reporte-sitios.component';
import { TicketnewComponent } from './componentes/ticketnew/ticketnew.component';
import { ReporteHallsComponent } from './componentes/reporte-halls/reporte-halls.component';
import { PlanilladiariaComponent } from './componentes/planilladiaria/planilladiaria.component';
import { AbmestadosComponent } from './componentes/abmestados/abmestados.component';
import { TicketResolucionComponent } from './componentes/ticket-resolucion/ticket-resolucion.component';
import { TicketCambioestadoComponent } from './componentes/ticket-cambioestado/ticket-cambioestado.component';
// Aqui se realiza el ruteo,  para poner ejemplo si uno pone http://..../login esto va al componente LoginComponent
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'ticketnew', component: TicketnewComponent, canActivate: [AuthGuard] },
  { path: 'ticketres', component: TicketResolucionComponent, canActivate: [AuthGuard] },
  { path: 'ticketCE', component: TicketCambioestadoComponent, canActivate: [AuthGuard] },
  { path: 'verTickets', component: VerticketsComponent, canActivate: [AuthGuard] },
  { path: 'abmSitios', component: AbmsitiosComponent, canActivate: [AuthGuard] },
  { path: 'abmEquipos', component: AbmequiposComponent, canActivate: [AuthGuard] },
  { path: 'abmHalls', component: AbmhallsComponent, canActivate: [AuthGuard] },
  { path: 'abmUsuarios', component: AbmusuariosComponent, canActivate: [AuthGuard] },
  { path: 'abmEstados', component: AbmestadosComponent, canActivate: [AuthGuard] },
  { path: 'reporteEquipos', component: ReporteEquiposComponent, canActivate: [AuthGuard] },
  { path: 'reporteSitios', component: ReporteSitiosComponent, canActivate: [AuthGuard] },
  { path: 'reporteHalls', component: ReporteHallsComponent, canActivate: [AuthGuard] },
  { path: 'planillaDiaria', component: PlanilladiariaComponent, canActivate: [AuthGuard] },
  { path: '**', component: Page404Component },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
