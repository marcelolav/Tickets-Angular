export interface UserInterface {
  id?: string;
  // name?: string;      // El nombre y apellido del usuario.
  // cargo?: string;     // Departamento u Area donde trabaja el usuario.
  nombre?: string;
  email: string;     // El email del usuario.
  password?: string;   // El pass es temporal a ver si anda...
  // photoUrl?: string;  // El url de la foto en caso que loguee con Google.
  // telefono?: string;  // El telefono personal o de la casa del usuario.
  // detalles: string;   // Puede almacenar los horarios de trabajo del usuario.
  rol: string;      // El rol que va a tener dentro del sistema (administrador - tecnico - basico)
}
