// esto es una biblioteca para hacer pedidos HTTP
const axios = require('axios');

const API_URL = 'http://localhost:3000/prendas';

// que es este async?
async function fetchPrendas() {
  try {
    // get es un mensaje del objeto axios (_es_ la biblioteca) que sirve para hacer una petición HTTP de tipo GET
    // que es este await?
    const response = await axios.get(API_URL);
    console.log('Prendas:', response.data);
  } catch (error) {
    console.error('Error cargando las prendas:', error.message);
  }
}

fetchPrendas();
