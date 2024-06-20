let listaDeNumerosSorteados = [];
let numeroLimite = 5;
let numeroSecreto = gerarNumeroAleatorio();
let numeroDeTentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

let mensagemTitulo = `Escolha um número entre 1 e ${numeroLimite}.`;

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', mensagemTitulo);
}

exibirMensagemInicial();

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let numeroDeElementosNaLista = listaDeNumerosSorteados.length;
    if (numeroDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); 
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns!');
        let palavraTentativas = numeroDeTentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${numeroDeTentativas} ${palavraTentativas}.`
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        exibirTextoNaTela('h1', 'Tente novamente');
        if(chute < numeroSecreto) {
            let mensagemChuteMenor = `O número secreto é maior que ${chute}.`;
            exibirTextoNaTela('p', mensagemChuteMenor);
        } else {
            let mensagemChuteMaior = `O número secreto é menor que ${chute}.`;
            exibirTextoNaTela('p', mensagemChuteMaior);
        }
        numeroDeTentativas++;
        limparCampo();
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    numeroDeTentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}