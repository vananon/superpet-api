import mongoose from 'mongoose';
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
    process.exit(1);
  }
};
