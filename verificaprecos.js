const axios = require('axios');

// Substitua com o símbolo desejado
const symbol = 'ADA_BRL';

// Função para obter informações básicas de um símbolo
async function getSymbolInfo(symbol) {
  const endpoint = `/market/ticker`;
  const url = `https://api.novadax.com/v1${endpoint}`;

  try {
    // Faz a solicitação GET
    const response = await axios.get(url, { params: { symbol } });

    // Manipula a resposta
    console.log('Valor da moeda:');
    console.log(response.data.data.lastPrice);
  } catch (error) {
    // Manipula erros
    console.error(`Erro na solicitação: ${error.response.status}`);
    console.error(error.response.data);
  }
}

// Chama a função para obter informações do símbolo
getSymbolInfo(symbol);