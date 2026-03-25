export interface Solicitud {
    id_solicitudes?: number;
    id_usuario: number;
    id_producto: number;
    cantidad: number;
    estado: 'pendiente' | 'aprobada' | 'rechazada';// solo son esos tre valores 
    fecha?: Date;
    observacion?: string;
    created_at?: Date;
    updated_at?: Date;
    nombre_producto?: string;// se agrego para mostrar el nombre del producto en la lista de solicitudes, ya que solo tenemos el id_producto, y seria mas facil mostrar el nombre del producto en lugar del id, ademas de que no es un campo tan grande como para justificar tenerlo en un archivo separado.
    nombre_usuario?: string;// se agrego para mostrar el nombre del usuario que hizo la solicitud, ya que solo tenemos el id_usuario, y seria mas facil mostrar el nombre del usuario en lugar del id, ademas de que no es un campo tan grande como para justificar tenerlo en un archivo separado.
}
