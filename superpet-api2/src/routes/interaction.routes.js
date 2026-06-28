import { Router } from 'express';
import Interaction from '../models/interaction.model.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try { res.status(201).json(await Interaction.create(req.body)); }
  catch (err) { next(err); }
});

router.get('/', async (req, res, next) => {
  try { res.json(await Interaction.find()); }
  catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const doc = await Interaction.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Interaccion no encontrada' });
    res.json(doc);
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const doc = await Interaction.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ message: 'Interaccion no encontrada' });
    res.json(doc);
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const doc = await Interaction.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Interaccion no encontrada' });
    res.json({ message: 'Interaccion eliminada', interaccion: doc });
  } catch (err) { next(err); }
});

export default router;
