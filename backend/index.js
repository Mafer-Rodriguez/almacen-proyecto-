const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')// Cargar variables de entorno


dotenv.config()//carga las variables de entorno desde el archivo .env

const app = express()
const PORT = process.env.PORT || 3000 

app.use(cors({
  origin: 'https://almacen-app-a8e30.web.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));// Habilitar CORS para permitir solicitudes desde el frontend, en otras palabras permite que Angular pueda comunicarse con este backend sin problemas de seguridad relacionados con el mismo origen (Same-Origin Policy).
app.use(express.json())// permite que la API entinda datos en formato JSON, lo cual es común en las solicitudes HTTP modernas, especialmente cuando se trabaja con APIs RESTful. Esto facilita la comunicación entre el frontend (Angular) y el backend (Node.js) al permitir que ambos intercambien datos de manera eficiente y estructurada.


// Rutas
const productosRoutes = require('./src/routes/productosRoutes') //importa las rutas relacionadas con productos desde el archivo productosRoutes.js. Estas rutas definirán los endpoints para manejar las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) relacionadas con los productos en la base de datos.
const movimientosRoutes = require('./src/routes/movimientosRoutes')
const solicitudesRoutes = require('./src/routes/solicitudesRoutes')
const usuariosRoutes = require('./src/routes/usuariosRoutes')

app.use('/api/productos', productosRoutes)//define que todas las rutas relacionadas con productos estarán bajo el prefijo /api/productos. Esto significa que cualquier solicitud a esta ruta será manejada por el controlador de productos.
app.use('/api/movimientos', movimientosRoutes)
app.use('/api/solicitudes', solicitudesRoutes)
app.use('/api/usuarios', usuariosRoutes)
app.options('/{*path}', cors(corsOptions))// Controladores

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API Almacén funcionando correctamente ✅' })
})

app.listen(PORT, () => { //Arranca el servidar en el puerto especificado en las variables de entorno o el puerto 3000 por defecto
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})

