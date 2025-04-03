const axios = require('axios');

const API_URL = 'http://localhost:3000/prendas';

async function fetchPrendas() {
  try {
    const response = await axios.get(API_URL);
    console.log('Prendas:', response.data);
  } catch (error) {
    console.error('Error fetching prendas:', error.message);
  }
}

fetchPrendas();
