import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';

import { connectDB } from './config/db.js';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/post.routes.js';
import commentRoutes from './routes/comment.routes.js';
import interactionRoutes from './routes/interaction.routes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

// 1) Cargar variables de entorno (.env)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 2) MIDDLEWARE DE SEGURIDAD Y UTILIDAD
app.use(helmet());                 // cabeceras HTTP seguras
app.use(cors());                   // control de origen cruzado
app.use(express.json());           // parsea el body JSON de las peticiones
app.use(morgan('dev'));            // registra (log) cada peticion en consola
app.use(rateLimit({                // limita peticiones para evitar abuso/DoS
  windowMs: 15 * 60 * 1000,        // 15 minutos
  max: 100,                        // max 100 peticiones por IP en esa ventana
}));

// 3) RUTA DE SALUD: sirve para evidenciar la conexion a la BD
app.get('/api/health', (req, res) => {
  const estados = ['desconectado', 'conectado', 'conectando', 'desconectando'];
  res.json({
    status: 'ok',
    api: 'PawLog by SuperPet',
    base_de_datos: estados[mongoose.connection.readyState],
  });
});

app.get('/', (req, res) => {
  res.json({ message: 'API PawLog by SuperPet funcionando' });
});

// 4) RUTAS DE CADA COLECCION (CRUD)
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/interactions', interactionRoutes);

// 5) MANEJO DE ERRORES (siempre al final)
app.use(notFound);
app.use(errorHandler);

// 6) CONECTAR A LA BD Y LUEGO ARRANCAR EL SERVIDOR
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
});
