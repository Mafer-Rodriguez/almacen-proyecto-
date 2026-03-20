const connection = require('../config/database')

const getMovimientos = (req, res) => {
  const query = `
    SELECT 
      m.id_movimientos,
      m.tipo,
      m.fecha,
      m.observacion,
      u.nombre AS nombre_usuario
    FROM movimientos m
    INNER JOIN usuarios u ON m.id_usuario = u.id_usuarios
  `
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        mensaje: 'Error al obtener movimientos',
        error: err
      })
    }
    res.status(200).json({
      mensaje: 'Movimientos obtenidos correctamente',
      datos: results
    })
  })
}

const postMovimiento = (req, res) => {
  const { id_usuario, tipo, observacion, detalles } = req.body

  const queryMovimiento = `
    INSERT INTO movimientos (id_usuario, tipo, observacion, fecha)
    VALUES (?, ?, ?, NOW())
  `

  connection.query(queryMovimiento, [id_usuario, tipo, observacion], (err, results) => {
    if (err) {
      return res.status(500).json({
        mensaje: 'Error al crear movimiento',
        error: err
      })
    }

    const idMovimiento = results.insertId

    const queryDetalles = `
      INSERT INTO detalle_movimientos (id_movimiento, id_producto, cantidad)
      VALUES ?
    `

    const valores = detalles.map((d) => [idMovimiento, d.id_producto, d.cantidad])

    connection.query(queryDetalles, [valores], (err2) => {
      if (err2) {
        return res.status(500).json({
          mensaje: 'Error al guardar detalles',
          error: err2
        })
      }
      res.status(201).json({
        mensaje: 'Movimiento registrado correctamente',
        id: idMovimiento
      })
    })
  })
}

module.exports = { getMovimientos, postMovimiento }