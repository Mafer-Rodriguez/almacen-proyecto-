const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')// Cargar variables de entorno

dotenv.config()//carga las variables de entorno desde el archivo .env

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())// Habilitar CORS para permitir solicitudes desde el frontend, en otras palabras permite que Angular pueda comunicarse con este backend sin problemas de seguridad relacionados con el mismo origen (Same-Origin Policy).
app.use(express.json())// permite que la API entinda datos en formato JSON, lo cual es común en las solicitudes HTTP modernas, especialmente cuando se trabaja con APIs RESTful. Esto facilita la comunicación entre el frontend (Angular) y el backend (Node.js) al permitir que ambos intercambien datos de manera eficiente y estructurada.

// Rutas
const productosRoutes = require('./src/routes/productosRoutes')
app.use('/api/productos', productosRoutes)//conecta las rutas de productos 

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API Almacén funcionando correctamente ✅' })
})

app.listen(PORT, () => { //Arranca el servidar en el puerto especificado en las variables de entorno o el puerto 3000 por defecto
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})