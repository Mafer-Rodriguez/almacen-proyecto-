export interface Producto {
    // Campos de la tabla productos, ademas recuerda que el ? indica que el campo es opcional
    id_productos?: number;
    nombre: string;
    descripcion?: string;
    cantidad: number;
    id_area: number;
    area_nombre?: string;
    created_at?: Date;
    updated_at?: Date;
    estado?: number;
}
