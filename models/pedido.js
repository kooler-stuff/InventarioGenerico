const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
    insumo: { type: String, required: true },
    cantidad: { type: Number, required: true },
    area: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
    imagen: { type: String, required: false }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
