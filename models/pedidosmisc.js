const mongoose = require('mongoose');

const PedidoMiscSchema = new mongoose.Schema({
    insumo: { type: String, required: true },
    cantidad: { type: Number, required: true },
    area: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
    descripcion: { type: String, required: true }, 
    estado: {type: String, required: true}
});

module.exports = mongoose.model('PedidoMisc', PedidoMiscSchema);
