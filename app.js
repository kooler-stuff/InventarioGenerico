require('dotenv').config(); // Load variables from .env into process.env
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

console.log(process.env.DB_USER); // 👉️ "james_doe"
console.log(process.env.ENV); // 👉️ "dev"
console.log(process.env.DB_PORT); // 👉️ "1234"
console.log(process.env.DB_PASSWORD); // 👉️ "1234"

const express = require('express')
const router = express.Router()

const app = express()
const port = 3000

// app.use(express.static('/Client/MainMenu.html'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/check', (req, res) => {
  res.json({ message: 'Servidor en funcionamiento' });
}); 

app.post('/auth', (req, res) => {
  const { Usuario, Contraseña } = req.body;
  if (Usuario === process.env.DB_USER && Contraseña === process.env.DB_PASSWORD) {
    res.json({ success: true, redirect: '/main_menu.html' });
  } else {
    res.status(401).json({ success: false, message: 'Los datos ingresados son incorrectos,\n reintente por favor' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

/*
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    if (req.url === '/check') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Servidor en funcionamiento' }));
    }
});
server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
*/