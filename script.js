var listaInfo = [];
var ordem = [];
var informacoes = {
    nome: "",
    palpite: 0,
    raioMinimo: 0,
    raioMaximo: 0,
    raioTotal: 0,
};
$(document).ready(function () {

    $('#btn-enviar').click(armazenaValores);
    
    function armazenaValores(){
        let info = {};
        info.nome = $('#nome-palpitador').val()
        info.palpite = parseFloat($('#valor-palpitado').val());
        listaInfo.push(info);
        listaInfo.sort((a, b) => a.palpite - b.palpite);
        console.log(listaInfo);
        verificaRaio();
    }

    /*function verificaOrdem(info){
        ordem.push(info.palpite); //adiciona um palpite na ultima posição do array
        ordem.sort((a, b) => a - b); //ordena o array em ordem crescente
        console.log(ordem);
    }*/

    function verificaRaio(){
        for (let i = 0; i < listaInfo.length; i++) {
            let participante = listaInfo[i];
            let proximoParticipante = listaInfo[i + 1];
            if(participante == listaInfo[0]){
                participante.raioMinimo = 0;
            }
            if (proximoParticipante) { // se tiver proximo participante
                participante.raioMaximo = (participante.palpite + proximoParticipante.palpite) / 2;
                proximoParticipante.raioMinimo = participante.raioMaximo + 0.01;
            } else { // se tiver for o ultimo participante
                participante.raioMaximo = Infinity;
            }

            console.log(`${participante.nome} ganharia do ${participante.raioMinimo} ao ${participante.raioMaximo}`);
        }
    }

});
