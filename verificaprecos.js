const axios = require('axios');

const { moeda } = require('./script');

async function getSymbolInfo(moeda) {
  const endpoint = `/market/ticker`;
  const url = `https://api.novadax.com/v1${endpoint}`;

  try {
    // Faz a solicitação GET
    const response = await axios.get(url, { params: { symbol } });

    // Manipula a resposta
    console.log('Informações do símbolo:');
    console.log(response.data.data);
  } catch (error) {
    // Manipula erros
    console.error(`Erro na solicitação: ${error.response.status}`);
    console.error(error.response.data);
  }
}

// Chama a função para obter informações do símbolo
getSymbolInfo(moeda);