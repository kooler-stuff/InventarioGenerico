const mongoose = require('mongoose'); 

const UserCredentialsSchema = new mongoose.Schema({
    usuario: { type: String, required: true },
    contraseña: { type: String, required: true },
});

module.exports = mongoose.model('user_credentials', UserCredentialsSchema);