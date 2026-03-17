const connection = require('../config/database')//importa la conexión a la base de datos para que el controlador pueda ejecutar consultas SQL.

const getProductos = (req, res) => {
  const query = `
    SELECT 
      p.id_productos,
      p.nombre,
      p.descripcion,
      p.cantidad,
      a.nombre AS area_nombre
    FROM productos p
    INNER JOIN areas a ON p.id_area = a.id_area
  `//realiza una consulta SQL para obtener los productos junto con el nombre del área a la que pertenecen. Utiliza una JOIN para combinar las tablas productos y areas basándose en el id_area.

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ //si hay un error regresa el codigo 500 (error del servidor) junto con un mensaje de error y el error en sí.
        mensaje: 'Error al obtener productos', 
        error: err 
      })
    }
    res.status(200).json({//si la consulta es exitosa, regresa un código 200 (OK) junto con un mensaje de éxito y los resultados de la consulta.
      mensaje: 'Productos obtenidos correctamente',
      datos: results
    })
  })
}

module.exports = { getProductos }//exporta la función getProductos para que pueda ser utilizada en las rutas.