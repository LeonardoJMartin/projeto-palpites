var listaInfo = [];
var ordem = [];
var informacoes = {
    nome: "",
    palpite: 0,
    raioMinimo: 0,
    raioMaximo: 0,
    raioTotal: 0,
};
var string = "";

var casasDecimais = 4;

$(document).ready(function () {
    string = localStorage.getItem("palpites");
    if(string != null){
        listaInfo = JSON.parse(string);
        preencheHtml();
    }
    
    $('#btn-limpar').click(clicarLimpar)
    $('#btn-enviar').click(armazenaValores);
    
    function armazenaValores(){
        let info = {};      
        info.palpite = parseFloat($('#valor-palpitado').val());
        listaInfo.push(info);
        listaInfo.sort((a, b) => a.palpite - b.palpite);
        
        console.log(listaInfo);
        verificaRaio();
        preencheHtml();
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
                participante.raioMaximo = parseFloat(((participante.palpite + proximoParticipante.palpite) / 2).toFixed(casasDecimais));
                proximoParticipante.raioMinimo = parseFloat((participante.raioMaximo + 0.0001).toFixed(casasDecimais));
                participante.raioTotal = parseFloat((participante.raioMaximo - participante.raioMinimo).toFixed(casasDecimais));
            } else { // se tiver for o ultimo participante
                participante.raioMaximo = Infinity;
                participante.raioTotal = Infinity;
            }

            console.log(`${participante.nome} ganharia do ${participante.raioMinimo} ao ${participante.raioMaximo}`);
        }
    }

    function preencheHtml(){
        limparDados();
        for(let i of listaInfo){
            i.raioTotal = i.raioTotal != null && i.raioTotal != Infinity ? parseFloat(i.raioTotal.toFixed(casasDecimais)) : i.raioTotal; 
            i.raioMaximo = i.raioMaximo != null && i.raioMaximo != Infinity ? parseFloat(i.raioMaximo.toFixed(casasDecimais)) : i.raioMaximo;
            string += 
            "<div class='centralizar'>" +
            "<strong class='padding-direita-4px'>Palpite:</strong>" + 
            i.palpite.toFixed(casasDecimais) +  
            "<strong class='padding-direita-4px padding-esquerda-8px'>Ganha:</strong>" + 
            i.raioMinimo.toFixed(casasDecimais) + 
            " ao " + 
            i.raioMaximo + 
            "<strong class='padding-direita-4px padding-esquerda-8px'>Raio total:</strong> " +
            i.raioTotal +
            "</div>"
        }
        string += "<p class='centralizar'><strong>"+listaInfo.length+" Palpites</strong></p>";
        salvaDados();
        $('#resultado').html(string);
    }

    function clicarLimpar(){
        limparDados();
        listaInfo = [];
    }

    function limparDados(){
        localStorage.removeItem("palpites");
        string = "";
        $('#resultado').html(string);
    }

    function salvaDados(){
        let jsonString = JSON.stringify(listaInfo);
        localStorage.setItem("palpites", jsonString);
    }

});


