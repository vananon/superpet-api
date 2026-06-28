
export const notFound = (req, res) => {
  res.status(404).json({ message: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
};

export const errorHandler = (err, req, res, next) => {
  console.error('Error capturado:', err.message);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Datos invalidos', detalles: err.message });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ message: `Valor invalido para el campo '${err.path}'` });
  }
  res.status(500).json({ message: 'Error interno del servidor' });
};
