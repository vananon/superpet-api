import mongoose from 'mongoose';

// Conecta a MongoDB usando las variables del .env.
// Pasamos usuario/clave como OPCIONES (no dentro de la URI) para evitar
// problemas con caracteres especiales de la contrasena (el "!").
export const connectDB = async () => {
  const {
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DB,
    MONGO_USER,
    MONGO_PASS,
    MONGO_AUTH_SOURCE,
  } = process.env;

  const uri = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

  // Eventos utiles para que veas en consola el estado de la conexion
  mongoose.connection.on('error', (err) => {
    console.error('Error de conexion con MongoDB:', err.message);
  });

  try {
    await mongoose.connect(uri, {
      user: MONGO_USER,
      pass: MONGO_PASS,
      authSource: MONGO_AUTH_SOURCE || 'admin',
    });
    console.log(`Conectado a MongoDB -> ${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`);
  } catch (err) {
    console.error('No se pudo conectar a MongoDB:', err.message);
    process.exit(1); // detiene la app si la BD no responde
  }
};
