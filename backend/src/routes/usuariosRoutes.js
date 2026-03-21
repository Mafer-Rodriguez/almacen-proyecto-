const express = require('express')
const router = express.Router()
const usuariosController = require('../controllers/usuariosController')

router.get('/', usuariosController.getUsuarios)
router.patch('/:id', usuariosController.patchUsuario)

module.exports = router