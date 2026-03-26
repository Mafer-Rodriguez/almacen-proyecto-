const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ['https://almacen-app-a8e30.web.app', 'http://localhost:4200'],
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
};

// Middleware global
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // preflight para todas las rutas
app.use(express.json());

// Rutas
const productosRoutes = require('./src/routes/productosRoutes');
const movimientosRoutes = require('./src/routes/movimientosRoutes');
const solicitudesRoutes = require('./src/routes/solicitudesRoutes');
const usuariosRoutes = require('./src/routes/usuariosRoutes');

app.use('/api/productos', productosRoutes);
app.use('/api/movimientos', movimientosRoutes);
app.use('/api/solicitudes', solicitudesRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API Almacén funcionando correctamente ✅' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
