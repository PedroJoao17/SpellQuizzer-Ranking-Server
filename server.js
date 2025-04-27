const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const rankingsRoutes = require('./routes/rankingsRoutes');

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/api', rankingsRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
