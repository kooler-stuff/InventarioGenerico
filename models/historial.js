const mongoose = require('mongoose');

const HistorialSchema = new mongoose.Schema({
    insumo: { type: String, required: true },
    cantidad: { type: Number, required: true },
    area: { type: String, required: true },
    tipo: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Historial', HistorialSchema);
