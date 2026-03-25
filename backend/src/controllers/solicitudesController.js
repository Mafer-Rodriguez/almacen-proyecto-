const connection = require('../config/database')


const getSolicitudes = (req, res) => {
  const query = `
    SELECT 
      s.id_solicitudes,
      s.cantidad,
      s.estado,
      s.fecha,
      s.observacion,
      u.nombre AS nombre_usuario,
      p.nombre AS nombre_producto
    FROM solicitudes s//la s es un alias para la tabla solicitudes, lo que hace que la consulta sea más legible y fácil de escribir. En lugar de escribir solicitudes cada vez, se puede usar s para referirse a esa tabla.
    INNER JOIN usuarios u ON s.id_usuario = u.id_usuarios
    INNER JOIN productos p ON s.id_producto = p.id_productos
  `
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        mensaje: 'Error al obtener solicitudes',
        error: err
      })
    }
    res.status(200).json({
      mensaje: 'Solicitudes obtenidas correctamente',
      datos: results
    })
  })
}

const postSolicitud = (req, res) => {
  const { id_usuario, id_producto, cantidad, estado, observacion } = req.body
  console.log('Body recibido:', req.body)

  const query = `
    INSERT INTO solicitudes (id_usuario, id_producto, cantidad, estado, observacion, fecha)
    VALUES (?, ?, ?, ?, ?, NOW())
  `

  connection.query(query, [id_usuario, id_producto, cantidad, estado, observacion], (err, results) => {
    if (err) {
      console.log('Error en query:', err)
      return res.status(500).json({
        mensaje: 'Error al crear solicitud',
        error: err
      })
    }
    res.status(201).json({
      mensaje: 'Solicitud creada correctamente',
      id: results.insertId
    })
  })
}

const patchSolicitud = (req, res) => {
  const { id } = req.params
  const { estado } = req.body

  const query = `UPDATE solicitudes SET estado = ? WHERE id_solicitud = ?`

  connection.query(query, [estado, id], (err, results) => {
    if (err) {
      return res.status(500).json({
        mensaje: 'Error al actualizar solicitud',
        error: err
      })
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({
        mensaje: 'Solicitud no encontrada'
      })
    }
    res.status(200).json({
      mensaje: 'Solicitud actualizada correctamente'
    })
  })
}

module.exports = { getSolicitudes, postSolicitud, patchSolicitud }