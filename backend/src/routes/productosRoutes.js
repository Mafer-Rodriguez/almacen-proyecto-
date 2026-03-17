const express = require('express')
const router = express.Router()//crea un enrutador de Express para manejar las rutas relacionadas con los productos. Esto permite organizar el código de manera modular y mantener las rutas relacionadas juntas.
const productosController = require('../controllers/productosController')

router.get('/', productosController.getProductos)//define una ruta GET para obtener todos los productos. Cuando se accede a esta ruta, se llama a la función getProductos del controlador de productos.

module.exports = router