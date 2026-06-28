import mongoose from 'mongoose';

const petSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
    nombre: { type: String, required: true },
    raza: { type: String },
    edad_meses: { type: Number },
    foto_perfil: { type: String },
    seguidores_count: { type: Number, default: 0 },
    intereses: { type: [String], default: [] },
  },
  { versionKey: false }
);

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
    email: { type: String, required: true },
    nombre_usuario: { type: String, required: true },
    avatar_url: { type: String },
    bio: { type: String },
    es_cliente_vip: { type: Boolean, default: false },
    fecha_creacion: { type: String, default: () => new Date().toISOString() },
    pets: { type: [petSchema], default: [] },
  },
  { versionKey: false }
);

export default mongoose.model('User', userSchema, 'users');
