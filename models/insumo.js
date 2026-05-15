const mongoose = require('mongoose');

const InsumoSchema = new mongoose.Schema({
    categoria: { type: String, required: true },
    insumo: { type: String, required: true },
    unidades: { type: Number, default: 0 },
    fecha: { type: Date, default: Date.now },
    imagen: { type: String, required: false }
});

module.exports = mongoose.model('Insumo', InsumoSchema);