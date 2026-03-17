const mysql2 = require('mysql2')
const dotenv = require('dotenv')

dotenv.config()

const connection = mysql2.createConnection({//la conexión a MySQL con los datos del archivo .env
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
})

connection.connect((err) => {//intenta conectarse y si hay error lo muestra en consola. Si la conexión es exitosa, muestra un mensaje de éxito.
  if (err) {
    console.error('Error conectando a MySQL:', err)
    return
  }
  console.log('Conexión a MySQL exitosa ✅')
})

module.exports = connection//exporta la conexión para que otros archivos puedan usarla.