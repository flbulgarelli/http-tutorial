const express = require('express');
const app = express();
const PORT = 3000;

const prendas = [
  { id: 1, tipo: 'pantalon', talle: 35 },
  { id: 2, tipo: 'pantalon', talle: 36 },
  { id: 3, tipo: 'camisa', talle: 'M' },
  { id: 4, tipo: 'camisa', talle: 'L' },
  { id: 5, tipo: 'zapatos', talle: 42 },
  { id: 6, tipo: 'zapatos', talle: 43 }
];

app.get('/prendas', (req, res) => {
  res.json(prendas);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
