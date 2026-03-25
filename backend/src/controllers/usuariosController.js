const connection = require('../config/database')

const getUsuarios = (req, res) => {
  const query = `
    SELECT 
      u.id_usuarios,
      u.nombre,
      u.apellidos,
      u.email,
      u.uid_firebase,
      r.nombre As nombre_rol
    FROM usuarios u
    INNER JOIN roles r ON u.id_rol = r.id_rol
  `
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        mensaje: 'Error al obtener usuarios',
        error: err
      })
    }
    res.status(200).json({
      mensaje: 'Usuarios obtenidos correctamente',
      datos: results
    })
  })
}

const patchUsuario = (req, res) => {
  const { id } = req.params
  const { id_rol } = req.body

  const query = `UPDATE usuarios SET id_rol = ? WHERE id_usuarios = ?`

  connection.query(query, [id_rol, id], (err, results) => {
    if (err) {
      return res.status(500).json({
        mensaje: 'Error al actualizar usuario',
        error: err
      })
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({
        mensaje: 'Usuario no encontrado'
      })
    }
    res.status(200).json({
      mensaje: 'Rol actualizado correctamente'
    })
  })
}

const getUsuarioPorEmail = (req, res) => {
  const { email } = req.params
  const query = `
    SELECT 
      u.id_usuarios,
      u.nombre,
      u.email,
      u.uid_firebase,
      r.nombre AS nombre_rol
    FROM usuarios u
    INNER JOIN roles r ON u.id_rol = r.id_rol
    WHERE u.email = ?
    LIMIT 1
  `
  connection.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({
        mensaje: 'Error al buscar usuario',
        error: err
      })
    }
    if (results.length === 0) {
      return res.status(404).json({
        mensaje: 'Usuario no encontrado'
      })
    }
    res.status(200).json({
      datos: results[0]
    })
  })
}

const postUsuario = (req, res) => {
  const { nombre, apellidos, email, uid_firebase, id_rol } = req.body

  const query = `
    INSERT INTO usuarios (nombre, apellidos, email, uid_firebase, id_rol)
    VALUES (?, ?, ?, ?, ?)
  `

  connection.query(query, [nombre, apellidos, email, uid_firebase, id_rol], (err, results) => {
    if (err) {
      return res.status(500).json({
        mensaje: 'Error al crear usuario',
        error: err
      })
    }
    res.status(201).json({
      mensaje: 'Usuario creado correctamente',
      id: results.insertId
    })
  })
}

module.exports = { getUsuarios, patchUsuario, getUsuarioPorEmail, postUsuario }
