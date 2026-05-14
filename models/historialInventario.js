const mongoose = require('mongoose');

const HistorialInventarioSchema = new mongoose.Schema({
    insumo: { type: String, required: true },
    categoria: { type: String, required: true },
    unidades: { type: Number, required: true },
    accion: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HistorialInventario', HistorialInventarioSchema);
