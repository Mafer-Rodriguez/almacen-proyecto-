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
const postProducto = (req, res) => {
    const { nombre, descripcion, cantidad, id_area } = req.body

    const query = `
    INSERT INTO productos (nombre, descripcion, cantidad, id_area)
    VALUES (?, ?, ?, ?)
  `

    connection.query(query, [nombre, descripcion, cantidad, id_area], (err, results) => {
        if (err) {
            return res.status(500).json({
                mensaje: 'Error al agregar producto',
                error: err
            })
        }
        res.status(201).json({
            mensaje: 'Producto agregado correctamente',
            id: results.insertId
        })
    })
}

const putProducto = (req, res) => {
    const { id } = req.params
    const { nombre, descripcion, cantidad, id_area } = req.body

    const query = `
    UPDATE productos 
    SET nombre = ?, descripcion = ?, cantidad = ?, id_area = ?
    WHERE id_productos = ?
  `

    connection.query(query, [nombre, descripcion, cantidad, id_area, id], (err, results) => {
        if (err) {
            return res.status(500).json({
                mensaje: 'Error al actualizar producto',
                error: err
            })
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            })
        }
        res.status(200).json({
            mensaje: 'Producto actualizado correctamente'
        })
    })
}

const patchProducto = (req, res) => {
    const { id } = req.params
    const campos = req.body

    const keys = Object.keys(campos)
    const values = Object.values(campos)

    const setQuery = keys.map(key => `${key} = ?`).join(', ')

    const query = `UPDATE productos SET ${setQuery} WHERE id_productos = ?`

    connection.query(query, [...values, id], (err, results) => {
        if (err) {
            return res.status(500).json({
                mensaje: 'Error al actualizar producto',
                error: err
            })
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            })
        }
        res.status(200).json({
            mensaje: 'Producto actualizado correctamente'
        })
    })
}

const deleteProducto = (req, res) => {
  const { id } = req.params
  console.log("Intentando eliminar producto con id:", id) // <-- log

  const query = `DELETE FROM productos WHERE id_productos = ?`

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error en DELETE:", err) // <-- log
      return res.status(500).json({
        mensaje: 'Error al eliminar producto',
        error: err
      })
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({
        mensaje: 'Producto no encontrado'
      })
    }
    res.status(200).json({
      mensaje: 'Producto eliminado correctamente'
    })
  })
}


module.exports = { getProductos, postProducto, putProducto, patchProducto, deleteProducto }//exporta la función getProductos para que pueda ser utilizada en las rutas.