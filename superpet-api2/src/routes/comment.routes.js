import { Router } from 'express';
import Comment from '../models/comment.model.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try { res.status(201).json(await Comment.create(req.body)); }
  catch (err) { next(err); }
});

router.get('/', async (req, res, next) => {
  try { res.json(await Comment.find()); }
  catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const doc = await Comment.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Comentario no encontrado' });
    res.json(doc);
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const doc = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ message: 'Comentario no encontrado' });
    res.json(doc);
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const doc = await Comment.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Comentario no encontrado' });
    res.json({ message: 'Comentario eliminado', comentario: doc });
  } catch (err) { next(err); }
});

export default router;
