const axios = require('axios');

async function getSymbolInfo(symbol) {
  const endpoint = `/market/ticker`;
  const url = `https://api.novadax.com/v1${endpoint}`;

  try {
    const response = await axios.get(url, { params: { symbol } });
    console.log('Informações do símbolo:');
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(`Erro na solicitação: ${error.response.status}`);
    console.error(error.response.data);
    throw error;
  }
}

function iniciarIntervalo() {
  setInterval(async function () {
    try {
      const data = await getSymbolInfo('ADA_BRL');
      // Preencha os dados no HTML ou faça o que for necessário com os dados
      console.log('Dados obtidos em verificaprecos.js:');
      console.log(data);
    } catch (error) {
      console.error('Erro em verificaprecos.js:');
      console.error(error);
    }
  }, 30000);
}

module.exports = { iniciarIntervalo };
