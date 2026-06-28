import { Router } from 'express';
import Post from '../models/post.model.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try { res.status(201).json(await Post.create(req.body)); }
  catch (err) { next(err); }
});

router.get('/', async (req, res, next) => {
  try { res.json(await Post.find()); }
  catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const doc = await Post.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Publicacion no encontrada' });
    res.json(doc);
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const doc = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ message: 'Publicacion no encontrada' });
    res.json(doc);
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const doc = await Post.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Publicacion no encontrada' });
    res.json({ message: 'Publicacion eliminada', publicacion: doc });
  } catch (err) { next(err); }
});

export default router;
