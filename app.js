require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const Insumo = require('./models/insumo');
const Pedido = require('./models/pedido');
const Prestado = require('./models/prestado');
const Historial = require('./models/historial');

const express = require('express');
const app = express();
const port = 3000;

// BD
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/inventario_com')
  .then(() => console.log(' Conexión exitosa a MongoDB'))
  .catch(err => console.error(' Error al conectar a MongoDB:', err));

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'c0ngr3s0',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000,
    sameSite: 'lax'
  }
}));

function isAuthenticated(req) {
  return req.session && req.session.authenticated === true;
}

app.use((req, res, next) => {
  const publicPaths = ['/', '/auth', '/check', '/index.html'];
  const allowedPrefixes = ['/styles/', '/media/'];

  if (publicPaths.includes(req.path) || allowedPrefixes.some(prefix => req.path.startsWith(prefix))) {
    return next();
  }

  if (isAuthenticated(req)) {
    return next();
  }

  if (req.path.startsWith('/api') || req.method !== 'GET') {
    return res.status(401).json({ success: false, message: 'No autorizado' });
  }

  return res.redirect('/');
});

app.use(express.static('public'));

//RUTAS

app.get('/api/insumo', async (req, res) => {
    try {
        const listaInsumos = await Insumo.find();
        res.json(listaInsumos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener datos" });
    }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/check', (req, res) => {
  res.json({ message: 'Servidor en funcionamiento' });
});

// POST
app.post('/insumo', async (req, res) => {
  try {
    const { categoria, insumo, unidades } = req.body;
    
    const nuevoInsumo = new Insumo({
      categoria,
      insumo,
      unidades
    });

    const guardado = await nuevoInsumo.save();
    res.status(201).json({ success: true, data: guardado });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app .post('/api/borrarinsumo', async (req, res) => {
  try {
    const { id } = req.body;
    await Insumo.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al borrar el insumo' });
  }
});

app.put('/api/modificarinsumo', async (req, res) => {
  try {
    const { id, categoria, insumo, unidades } = req.body;
    const updated = await Insumo.findByIdAndUpdate(id, { categoria, insumo, unidades }, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Insumo no encontrado' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al modificar el insumo' });
  }
});

app.get('/api/insumo', async (req, res) => {
  try {
    const todos = await Insumo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los datos' });
  }
});

app.post('/auth', (req, res) => {
  const { Usuario, Contraseña } = req.body;
  if (Usuario === process.env.DB_USER && Contraseña === process.env.DB_PASSWORD) {
    req.session.authenticated = true;
    res.json({ success: true, redirect: '/main_menu.html' });
  } else {
    res.status(401).json({ success: false, message: 'Usuario o contraseña \n incorrectos.' });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error al cerrar sesión' });
    }
    res.json({ success: true, redirect: '/' });
  });
});

app.get('/api/pedidos', async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
});

app.post('/api/pedidos', async (req, res) => {
  try {
    const { insumo, cantidad, area } = req.body;
    const nuevoPedido = new Pedido({ insumo, cantidad, area });
    await nuevoPedido.save();
    await Historial.create({ insumo, cantidad, area, tipo: 'Pedido' });
    res.json({ success: true, data: nuevoPedido });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.get('/api/prestados', async (req, res) => {
  try {
    const prestados = await Prestado.find();
    res.json(prestados);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener prestados' });
  }
});

app.post('/api/prestados', async (req, res) => {
  try {
    const { insumo, cantidad, area } = req.body;
    const nuevoPrestamo = new Prestado({ insumo, cantidad, area });
    await nuevoPrestamo.save();
    await Historial.create({ insumo, cantidad, area, tipo: 'Préstamo' });
    res.json({ success: true, data: nuevoPrestamo });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.get('/api/historial', async (req, res) => {
  try {
    const historial = await Historial.find();
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historial' });
  }
});

app.listen(port, () => {
  console.log(` Servidor corriendo en http://localhost:${port}`);
});