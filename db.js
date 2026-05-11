const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/inventario_com';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Conexión a MongoDB establecida');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
    };

connectDB();