export interface Ticket {
    id?: string;
    fechaIngreso: string;
    horaIngreso: string;
    fechaRevision?: string;
    horaRevision?: string;
    fechaSolucion?: string;
    horaSolucion?: string;
    nombreUsuario?: string;
    emailUsuario: string;
    sitio: string;
    usuarioEquipo: string;
    hall: string;
    nombreEquipo: string;
    desperfecto: string;
    evaluacionTecnica?: string;
    resolucionTecnica?: string;
    nombreTecnico?: string;
    estadoTicket: string;
    estadoEquipo?: string;
}
