export interface Movimiento {
    id_movimientos?: number;
    id_usuario: number;
    tipo: 'entrada' | 'salida';//estso se llaman tipos literales, solo pueden ser esos dos valores. le dicemos tipo de movimiento, si es una entrada o una salida de productos
    //basicamnete ese campo solo puede tener esos dos valores, lo cual es muy util para evitar errores de tipeo o valores no validos
    fecha?: Date;
    observacion?: string;
    created_at?: Date;
    detalles?: DetalleMovimiento[];// es un areglo de detalles, porque un movimiento puede tener varios productos asociados, por ejemplo una entrada de 10 productos diferentes, entonces cada uno de esos productos seria un detalle del movimiento, y cada detalle tendria la cantidad de ese producto que se esta moviendo.
}
//nota: se colocaron en el mismo archivo por que detalles de movimiento es una parte importante del movimiento, y es mas facil de manejar asi, ademas de que no es un modelo tan grande como para justificar tenerlo en un archivo separado.
export interface DetalleMovimiento {
    id_detalle?: number;
    id_movimientos?: number;
    id_producto: number;
    cantidad: number;
    nombre_producto?: string;
}
