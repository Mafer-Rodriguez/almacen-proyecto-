export interface Usuario {
    id_usuario?: number;
    nombre: string;
    email: string;
    uid_firebase: string;
    id_rol: number;
    nombre_rol?: string;// se agrego para saber si es empleado, maestro o alumno 
    created_at?: Date;
}
