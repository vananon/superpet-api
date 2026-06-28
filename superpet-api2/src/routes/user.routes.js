import { Router } from 'express';
import User from '../models/user.model.js';

const router = Router();

// CREATE -> POST /api/users
router.post('/', async (req, res, next) => {
  try {
    const nuevo = await User.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) { next(err); }
});

// READ lista -> GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const lista = await User.find();
    res.json(lista);
  } catch (err) { next(err); }
});

// READ por id -> GET /api/users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const doc = await User.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(doc);
  } catch (err) { next(err); }
});

// UPDATE -> PUT /api/users/:id
router.put('/:id', async (req, res, next) => {
  try {
    const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(doc);
  } catch (err) { next(err); }
});

// DELETE -> DELETE /api/users/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const doc = await User.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado', usuario: doc });
  } catch (err) { next(err); }
});

// ADD PET -> POST /api/users/:id/pets
router.post('/:id/pets', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    
    user.pets.push(req.body);
    await user.save();
    
    res.status(201).json({ message: 'Mascota agregada', pets: user.pets });
  } catch (err) { next(err); }
});

// REMOVE PET -> DELETE /api/users/:id/pets/:petId
router.delete('/:id/pets/:petId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    
    const initialLength = user.pets.length;
    user.pets = user.pets.filter(p => p._id !== req.params.petId);
    
    if (user.pets.length === initialLength) {
      return res.status(404).json({ message: 'Mascota no encontrada en el usuario' });
    }
    
    await user.save();
    res.json({ message: 'Mascota eliminada', pets: user.pets });
  } catch (err) { next(err); }
});

export default router;
