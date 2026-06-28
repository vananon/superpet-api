import mongoose from 'mongoose';

const interactionSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
    id_usuario: { type: String, required: true },
    tipo_interaccion: { type: String, required: true },
    entidad_destino_id: { type: String, required: true },
    fecha: { type: String, default: () => new Date().toISOString() },
  },
  { versionKey: false }
);

export default mongoose.model('Interaction', interactionSchema, 'interactions');
