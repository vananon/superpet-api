import mongoose from 'mongoose';

const autorSchema = new mongoose.Schema(
  {
    nombre_mascota: { type: String },
    foto_mascota: { type: String },
    usuario_handle: { type: String },
  },
  { _id: false }
);

const postSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
    id_mascota: { type: String, required: true },
    autor: { type: autorSchema },
    tipo: { type: String },
    contenido_texto: { type: String },
    media_url: { type: [String], default: [] },
    likes_count: { type: Number, default: 0 },
    comentarios_count: { type: Number, default: 0 },
    fecha_publicacion: { type: String, default: () => new Date().toISOString() },
  },
  { versionKey: false }
);

export default mongoose.model('Post', postSchema, 'posts');
