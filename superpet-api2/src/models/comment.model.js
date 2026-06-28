import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
    id_publicacion: { type: String, required: true },
    id_usuario: { type: String, required: true },
    handle_usuario: { type: String },
    texto: { type: String, required: true },
    fecha_comentario: { type: String, default: () => new Date().toISOString() },
  },
  { versionKey: false }
);

export default mongoose.model('Comment', commentSchema, 'comments');
