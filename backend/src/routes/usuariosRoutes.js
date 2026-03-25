const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Rutas de usuarios
router.get('/', usuariosController.getUsuarios);            // Obtener todos los usuarios
router.get('/email/:email', usuariosController.getUsuarioPorEmail); // Buscar usuario por email
router.patch('/:id', usuariosController.patchUsuario);      // Actualizar rol de usuario
router.post('/', usuariosController.postUsuario);           // Crear nuevo usuario

module.exports = router;
